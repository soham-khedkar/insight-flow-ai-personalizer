import Papa from 'papaparse';

export interface ProcessedCustomerData {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  totalSpent?: number;
  totalOrders?: number;
  lastActivity?: string;
  segmentId?: number;
  customFields?: Record<string, any>;
}

export class DataProcessor {
  static async processCSV(file: File): Promise<ProcessedCustomerData[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          try {
            const processedData = results.data.map((row: any, index: number) => 
              this.normalizeCustomerData(row, index)
            ).filter(Boolean);
            resolve(processedData as ProcessedCustomerData[]);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => reject(error)
      });
    });
  }

  static async processJSON(file: File): Promise<ProcessedCustomerData[]> {
    const text = await file.text();
    const data = JSON.parse(text);
    const array = Array.isArray(data) ? data : [data];
    return array.map((item, index) => this.normalizeCustomerData(item, index)).filter(Boolean);
  }

  static normalizeCustomerData(row: any, index: number): ProcessedCustomerData | null {
    if (!row || typeof row !== 'object') return null;

    // Generate ID if not present
    const id = row.id || row.customer_id || row.user_id || `imported_${Date.now()}_${index}`;

    // Map common field variations
    const email = row.email || row.Email || row.email_address || row.EmailAddress;
    const firstName = row.firstName || row.first_name || row.FirstName || row.fname;
    const lastName = row.lastName || row.last_name || row.LastName || row.lname;
    
    // Parse monetary values
    const totalSpent = this.parseNumber(
      row.totalSpent || row.total_spent || row.TotalSpent || row.revenue || row.ltv
    );
    
    const totalOrders = this.parseNumber(
      row.totalOrders || row.total_orders || row.TotalOrders || row.order_count || row.purchases
    );

    // Parse dates
    const lastActivity = this.parseDate(
      row.lastActivity || row.last_activity || row.LastActivity || row.last_seen || row.updated_at
    );

    // Collect custom fields
    const customFields: Record<string, any> = {};
    Object.keys(row).forEach(key => {
      const normalizedKey = key.toLowerCase();
      if (!['id', 'email', 'firstname', 'lastname', 'totalspent', 'totalorders', 'lastactivity'].includes(normalizedKey.replace('_', ''))) {
        customFields[key] = row[key];
      }
    });

    return {
      id: String(id),
      email,
      firstName,
      lastName,
      totalSpent,
      totalOrders,
      lastActivity,
      customFields: Object.keys(customFields).length > 0 ? customFields : undefined
    };
  }

  private static parseNumber(value: any): number | undefined {
    if (value == null || value === '') return undefined;
    
    // Remove currency symbols and commas
    const cleaned = String(value).replace(/[$,€£¥]/g, '');
    const num = parseFloat(cleaned);
    
    return isNaN(num) ? undefined : num;
  }

  private static parseDate(value: any): string | undefined {
    if (!value) return undefined;
    
    try {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date.toISOString();
    } catch {
      return undefined;
    }
  }
}
