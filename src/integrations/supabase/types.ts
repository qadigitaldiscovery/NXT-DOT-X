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
      activity_logs: {
        Row: {
          action: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          performed_at: string | null
          performed_by: string | null
        }
        Insert: {
          action: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          performed_at?: string | null
          performed_by?: string | null
        }
        Update: {
          action?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          performed_at?: string | null
          performed_by?: string | null
        }
        Relationships: []
      }
      alert_settings: {
        Row: {
          alert_type: string
          conditions: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          recipients: Json | null
          severity: string
          updated_at: string | null
        }
        Insert: {
          alert_type: string
          conditions: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          recipients?: Json | null
          severity: string
          updated_at?: string | null
        }
        Update: {
          alert_type?: string
          conditions?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          recipients?: Json | null
          severity?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      alerts: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          recipient_id: string | null
          related_entity_id: string | null
          related_entity_type: string | null
          severity: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          recipient_id?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          severity: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          recipient_id?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          severity?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      api_provider_settings: {
        Row: {
          api_key: string
          created_at: string
          id: string
          preferred_model: string | null
          provider_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          id?: string
          preferred_model?: string | null
          provider_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          preferred_model?: string | null
          provider_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      approval_actions: {
        Row: {
          action: string
          actor_id: string
          comments: string | null
          created_at: string | null
          id: string
          request_id: string
          step: number
        }
        Insert: {
          action: string
          actor_id: string
          comments?: string | null
          created_at?: string | null
          id?: string
          request_id: string
          step: number
        }
        Update: {
          action?: string
          actor_id?: string
          comments?: string | null
          created_at?: string | null
          id?: string
          request_id?: string
          step?: number
        }
        Relationships: [
          {
            foreignKeyName: "approval_actions_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "approval_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_requests: {
        Row: {
          created_at: string | null
          current_step: number | null
          entity_id: string
          entity_type: string
          id: string
          requestor_comments: string | null
          requestor_id: string
          status: string | null
          updated_at: string | null
          workflow_id: string
        }
        Insert: {
          created_at?: string | null
          current_step?: number | null
          entity_id: string
          entity_type: string
          id?: string
          requestor_comments?: string | null
          requestor_id: string
          status?: string | null
          updated_at?: string | null
          workflow_id: string
        }
        Update: {
          created_at?: string | null
          current_step?: number | null
          entity_id?: string
          entity_type?: string
          id?: string
          requestor_comments?: string | null
          requestor_id?: string
          status?: string | null
          updated_at?: string | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_requests_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "approval_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_workflows: {
        Row: {
          conditions: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          entity_type: string
          id: string
          is_active: boolean | null
          name: string
          steps: Json
          updated_at: string | null
        }
        Insert: {
          conditions: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          entity_type: string
          id?: string
          is_active?: boolean | null
          name: string
          steps: Json
          updated_at?: string | null
        }
        Update: {
          conditions?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          entity_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
          steps?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      currency_exchange_rates: {
        Row: {
          created_at: string | null
          created_by: string | null
          effective_date: string
          from_currency: string
          id: string
          is_manual: boolean | null
          rate: number
          to_currency: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          effective_date?: string
          from_currency: string
          id?: string
          is_manual?: boolean | null
          rate: number
          to_currency: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          effective_date?: string
          from_currency?: string
          id?: string
          is_manual?: boolean | null
          rate?: number
          to_currency?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      document_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          author: string | null
          category_id: string
          content: string | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          share_id: string | null
          title: string
          type: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          author?: string | null
          category_id: string
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          share_id?: string | null
          title: string
          type: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          author?: string | null
          category_id?: string
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          share_id?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "document_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      kpi_indicators: {
        Row: {
          id: string
          kpi_title: string
          kpi_value: number
          module_name: string
          rag_status: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          kpi_title: string
          kpi_value: number
          module_name: string
          rag_status: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          kpi_title?: string
          kpi_value?: number
          module_name?: string
          rag_status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      landed_cost_components: {
        Row: {
          applies_to: string[] | null
          created_at: string | null
          formula: string | null
          id: string
          is_active: boolean | null
          name: string
          sequence: number | null
          template_id: string
          type: string
          updated_at: string | null
          value: number
        }
        Insert: {
          applies_to?: string[] | null
          created_at?: string | null
          formula?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sequence?: number | null
          template_id: string
          type: string
          updated_at?: string | null
          value: number
        }
        Update: {
          applies_to?: string[] | null
          created_at?: string | null
          formula?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sequence?: number | null
          template_id?: string
          type?: string
          updated_at?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "landed_cost_components_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "landed_cost_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      landed_cost_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      loyalty_accounts: {
        Row: {
          created_at: string
          join_date: string
          last_activity_date: string | null
          loyalty_id: number
          next_tier_evaluation_date: string | null
          points_balance: number
          tier_assigned_date: string | null
          tier_level: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          join_date?: string
          last_activity_date?: string | null
          loyalty_id?: number
          next_tier_evaluation_date?: string | null
          points_balance?: number
          tier_assigned_date?: string | null
          tier_level?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          join_date?: string
          last_activity_date?: string | null
          loyalty_id?: number
          next_tier_evaluation_date?: string | null
          points_balance?: number
          tier_assigned_date?: string | null
          tier_level?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      loyalty_rewards_v1: {
        Row: {
          created_at: string
          description_v1: string | null
          is_active: boolean
          points_cost: number
          redemption_instructions_v1: string | null
          reward_id: number
          reward_name: string
          reward_type: string
          updated_at: string
          value_monetary: number | null
        }
        Insert: {
          created_at?: string
          description_v1?: string | null
          is_active?: boolean
          points_cost: number
          redemption_instructions_v1?: string | null
          reward_id?: number
          reward_name: string
          reward_type: string
          updated_at?: string
          value_monetary?: number | null
        }
        Update: {
          created_at?: string
          description_v1?: string | null
          is_active?: boolean
          points_cost?: number
          redemption_instructions_v1?: string | null
          reward_id?: number
          reward_name?: string
          reward_type?: string
          updated_at?: string
          value_monetary?: number | null
        }
        Relationships: []
      }
      loyalty_tiers: {
        Row: {
          benefits_summary_v1: string | null
          created_at: string
          description_v1: string | null
          min_points_required: number
          tier_id: number
          tier_name: string
          updated_at: string
        }
        Insert: {
          benefits_summary_v1?: string | null
          created_at?: string
          description_v1?: string | null
          min_points_required: number
          tier_id?: number
          tier_name: string
          updated_at?: string
        }
        Update: {
          benefits_summary_v1?: string | null
          created_at?: string
          description_v1?: string | null
          min_points_required?: number
          tier_id?: number
          tier_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      loyalty_transactions: {
        Row: {
          created_at: string
          description: string | null
          loyalty_id: number
          points_amount: number
          points_expiry_date: string | null
          reference_id: string | null
          related_order_value: number | null
          transaction_date: string
          transaction_id: number
          transaction_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          loyalty_id: number
          points_amount: number
          points_expiry_date?: string | null
          reference_id?: string | null
          related_order_value?: number | null
          transaction_date?: string
          transaction_id?: number
          transaction_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          loyalty_id?: number
          points_amount?: number
          points_expiry_date?: string | null
          reference_id?: string | null
          related_order_value?: number | null
          transaction_date?: string
          transaction_id?: number
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_transactions_loyalty_id_fkey"
            columns: ["loyalty_id"]
            isOneToOne: false
            referencedRelation: "loyalty_accounts"
            referencedColumns: ["loyalty_id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          is_read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      product_landed_costs: {
        Row: {
          base_cost: number
          components: Json | null
          created_at: string | null
          id: string
          supplier_cost_id: string
          template_id: string
          total_landed_cost: number
          updated_at: string | null
        }
        Insert: {
          base_cost: number
          components?: Json | null
          created_at?: string | null
          id?: string
          supplier_cost_id: string
          template_id: string
          total_landed_cost: number
          updated_at?: string | null
        }
        Update: {
          base_cost?: number
          components?: Json | null
          created_at?: string | null
          id?: string
          supplier_cost_id?: string
          template_id?: string
          total_landed_cost?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_landed_costs_supplier_cost_id_fkey"
            columns: ["supplier_cost_id"]
            isOneToOne: false
            referencedRelation: "supplier_product_costs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_landed_costs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "landed_cost_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          sku: string
          uom: string | null
          updated_at: string | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sku: string
          uom?: string | null
          updated_at?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sku?: string
          uom?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_members: {
        Row: {
          created_at: string | null
          id: string
          project_id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id: string
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          owner_id: string | null
          rag_status: string | null
          start_date: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          owner_id?: string | null
          rag_status?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          rag_status?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rag_status_logs: {
        Row: {
          created_at: string | null
          id: string
          module_id: string
          note: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          module_id: string
          note?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          id?: string
          module_id?: string
          note?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "rag_status_logs_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_column_mappings: {
        Row: {
          created_at: string | null
          created_by: string | null
          file_type: string
          id: string
          is_active: boolean | null
          mappings: Json
          supplier_id: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          file_type: string
          id?: string
          is_active?: boolean | null
          mappings: Json
          supplier_id: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          file_type?: string
          id?: string
          is_active?: boolean | null
          mappings?: Json
          supplier_id?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_column_mappings_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_contacts: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_primary: boolean | null
          name: string
          phone: string | null
          position: string | null
          supplier_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean | null
          name: string
          phone?: string | null
          position?: string | null
          supplier_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean | null
          name?: string
          phone?: string | null
          position?: string | null
          supplier_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_contacts_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_cost_history: {
        Row: {
          change_percentage: number | null
          change_reason: string | null
          changed_by: string | null
          cost_id: string
          created_at: string | null
          currency_code: string | null
          id: string
          new_cost: number | null
          previous_cost: number | null
          product_id: string
          supplier_id: string
        }
        Insert: {
          change_percentage?: number | null
          change_reason?: string | null
          changed_by?: string | null
          cost_id: string
          created_at?: string | null
          currency_code?: string | null
          id?: string
          new_cost?: number | null
          previous_cost?: number | null
          product_id: string
          supplier_id: string
        }
        Update: {
          change_percentage?: number | null
          change_reason?: string | null
          changed_by?: string | null
          cost_id?: string
          created_at?: string | null
          currency_code?: string | null
          id?: string
          new_cost?: number | null
          previous_cost?: number | null
          product_id?: string
          supplier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_cost_history_cost_id_fkey"
            columns: ["cost_id"]
            isOneToOne: false
            referencedRelation: "supplier_product_costs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_cost_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_cost_history_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_cost_uploads: {
        Row: {
          created_at: string | null
          created_by: string | null
          error_rows: number | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          processed_rows: number | null
          processing_end: string | null
          processing_notes: Json | null
          processing_start: string | null
          source: string
          status: string | null
          supplier_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          error_rows?: number | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          processed_rows?: number | null
          processing_end?: string | null
          processing_notes?: Json | null
          processing_start?: string | null
          source: string
          status?: string | null
          supplier_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          error_rows?: number | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          processed_rows?: number | null
          processing_end?: string | null
          processing_notes?: Json | null
          processing_start?: string | null
          source?: string
          status?: string | null
          supplier_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_cost_uploads_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_documents: {
        Row: {
          created_at: string | null
          document_type: string
          expiry_date: string | null
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          supplier_id: string
          updated_at: string | null
          upload_date: string | null
        }
        Insert: {
          created_at?: string | null
          document_type: string
          expiry_date?: string | null
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          supplier_id: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Update: {
          created_at?: string | null
          document_type?: string
          expiry_date?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          supplier_id?: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_documents_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_product_costs: {
        Row: {
          cost: number
          cost_in_base_currency: number | null
          cost_upload_id: string | null
          created_at: string | null
          created_by: string | null
          currency_code: string | null
          effective_date: string | null
          exchange_rate: number | null
          expiry_date: string | null
          id: string
          is_contract: boolean | null
          is_promotional: boolean | null
          max_qty: number | null
          min_qty: number | null
          notes: string | null
          product_id: string
          status: string | null
          supplier_id: string
          supplier_sku: string | null
          updated_at: string | null
        }
        Insert: {
          cost: number
          cost_in_base_currency?: number | null
          cost_upload_id?: string | null
          created_at?: string | null
          created_by?: string | null
          currency_code?: string | null
          effective_date?: string | null
          exchange_rate?: number | null
          expiry_date?: string | null
          id?: string
          is_contract?: boolean | null
          is_promotional?: boolean | null
          max_qty?: number | null
          min_qty?: number | null
          notes?: string | null
          product_id: string
          status?: string | null
          supplier_id: string
          supplier_sku?: string | null
          updated_at?: string | null
        }
        Update: {
          cost?: number
          cost_in_base_currency?: number | null
          cost_upload_id?: string | null
          created_at?: string | null
          created_by?: string | null
          currency_code?: string | null
          effective_date?: string | null
          exchange_rate?: number | null
          expiry_date?: string | null
          id?: string
          is_contract?: boolean | null
          is_promotional?: boolean | null
          max_qty?: number | null
          min_qty?: number | null
          notes?: string | null
          product_id?: string
          status?: string | null
          supplier_id?: string
          supplier_sku?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_product_costs_cost_upload_id_fkey"
            columns: ["cost_upload_id"]
            isOneToOne: false
            referencedRelation: "supplier_cost_uploads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_product_costs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_product_costs_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          code: string
          contact_name: string | null
          created_at: string | null
          discount_structure: Json | null
          email: string | null
          id: string
          name: string
          payment_terms: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          code: string
          contact_name?: string | null
          created_at?: string | null
          discount_structure?: Json | null
          email?: string | null
          id?: string
          name: string
          payment_terms?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          code?: string
          contact_name?: string | null
          created_at?: string | null
          discount_structure?: Json | null
          email?: string | null
          id?: string
          name?: string
          payment_terms?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      system_configurations: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_encrypted: boolean | null
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_encrypted?: boolean | null
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_encrypted?: boolean | null
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      task_attachments: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          task_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          task_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_attachments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          task_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          task_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          task_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          parent_task_id: string | null
          priority: string | null
          project_id: string
          status: string | null
          time_estimated: number | null
          time_spent: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          parent_task_id?: string | null
          priority?: string | null
          project_id: string
          status?: string | null
          time_estimated?: number | null
          time_spent?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          parent_task_id?: string | null
          priority?: string | null
          project_id?: string
          status?: string | null
          time_estimated?: number | null
          time_spent?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_module_access: {
        Row: {
          category: string | null
          id: string
          is_enabled: boolean
          module_slug: string
          submenu_slug: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          id?: string
          is_enabled?: boolean
          module_slug: string
          submenu_slug?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          id?: string
          is_enabled?: boolean
          module_slug?: string
          submenu_slug?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          role: string
          user_id: string
        }
        Insert: {
          role: string
          user_id: string
        }
        Update: {
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      validation_rules: {
        Row: {
          applies_to: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          error_message: string
          field_name: string
          id: string
          is_active: boolean | null
          name: string
          rule_config: Json
          rule_type: string
          updated_at: string | null
        }
        Insert: {
          applies_to?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          error_message: string
          field_name: string
          id?: string
          is_active?: boolean | null
          name: string
          rule_config: Json
          rule_type: string
          updated_at?: string | null
        }
        Update: {
          applies_to?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          error_message?: string
          field_name?: string
          id?: string
          is_active?: boolean | null
          name?: string
          rule_config?: Json
          rule_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { check_user_id: string; check_role: string }
        Returns: boolean
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
