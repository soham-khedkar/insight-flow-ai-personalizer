import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface ImportedData {
  id: string;
  fileName: string;
  recordCount: number;
  importedAt: string;
  status: 'processing' | 'completed' | 'failed';
  customers: any[];
}

export const useFileImport = () => {
  const [imports, setImports] = useState<ImportedData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processImportedData = async (data: any) => {
    try {
      setIsProcessing(true);
      
      const importRecord: ImportedData = {
        id: crypto.randomUUID(),
        fileName: data.fileName || 'Unknown',
        recordCount: data.processedCount || 0,
        importedAt: new Date().toISOString(),
        status: 'completed',
        customers: data.customers || []
      };

      setImports(prev => [...prev, importRecord]);

      // Trigger re-segmentation after data import
      const { data: segmentData, error } = await supabase.functions.invoke('perform-segmentation', {
        body: { includeImported: true }
      });

      if (error) {
        console.error('Segmentation error:', error);
        toast({
          title: "Import completed with warning",
          description: "Data imported but automatic segmentation failed. You can manually trigger segmentation.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Import and segmentation completed",
          description: `Successfully imported ${importRecord.recordCount} records and updated segments.`,
        });
      }

      return importRecord;
    } catch (error) {
      console.error('Error processing imported data:', error);
      toast({
        title: "Import processing failed",
        description: "There was an error processing the imported data.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const clearImports = () => {
    setImports([]);
  };

  const removeImport = (id: string) => {
    setImports(prev => prev.filter(imp => imp.id !== id));
  };

  return {
    imports,
    isProcessing,
    processImportedData,
    clearImports,
    removeImport
  };
};
