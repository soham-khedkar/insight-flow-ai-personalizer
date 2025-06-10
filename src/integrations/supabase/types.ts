export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaigns: {
        Row: {
          click_rate: number | null
          conversion_rate: number | null
          created_at: string | null
          id: string
          name: string
          roi: number | null
          segment_id: number | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          click_rate?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          id?: string
          name: string
          roi?: number | null
          segment_id?: number | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          click_rate?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          id?: string
          name?: string
          roi?: number | null
          segment_id?: number | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "segments"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_analytics: {
        Row: {
          avg_order_value: number | null
          avg_time_between_purchases: number | null
          bounce_rate: number | null
          days_since_last_visit: number | null
          engagement_score: number | null
          purchase_frequency: number | null
          session_duration: number | null
          total_purchases: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avg_order_value?: number | null
          avg_time_between_purchases?: number | null
          bounce_rate?: number | null
          days_since_last_visit?: number | null
          engagement_score?: number | null
          purchase_frequency?: number | null
          session_duration?: number | null
          total_purchases?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avg_order_value?: number | null
          avg_time_between_purchases?: number | null
          bounce_rate?: number | null
          days_since_last_visit?: number | null
          engagement_score?: number | null
          purchase_frequency?: number | null
          session_duration?: number | null
          total_purchases?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_metrics: {
        Row: {
          id: number
          metric_name: string
          metric_type: string | null
          metric_value: number
          updated_at: string | null
        }
        Insert: {
          id?: number
          metric_name: string
          metric_type?: string | null
          metric_value: number
          updated_at?: string | null
        }
        Update: {
          id?: number
          metric_name?: string
          metric_type?: string | null
          metric_value?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      segments: {
        Row: {
          avg_order_value: number | null
          characteristics: Json | null
          color: string | null
          conversion_rate: number | null
          created_at: string | null
          description: string | null
          id: number
          name: string
          user_count: number | null
        }
        Insert: {
          avg_order_value?: number | null
          characteristics?: Json | null
          color?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          user_count?: number | null
        }
        Update: {
          avg_order_value?: number | null
          characteristics?: Json | null
          color?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          user_count?: number | null
        }
        Relationships: []
      }
      user_events: {
        Row: {
          event_data: Json | null
          event_type: string
          id: string
          timestamp: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          event_data?: Json | null
          event_type: string
          id?: string
          timestamp?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          event_data?: Json | null
          event_type?: string
          id?: string
          timestamp?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_activity: string | null
          last_name: string | null
          segment_id: number | null
          total_orders: number | null
          total_spent: number | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_activity?: string | null
          last_name?: string | null
          segment_id?: number | null
          total_orders?: number | null
          total_spent?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_activity?: string | null
          last_name?: string | null
          segment_id?: number | null
          total_orders?: number | null
          total_spent?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_sample_event: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
