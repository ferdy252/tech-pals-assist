export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          avatar_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string
          full_name?: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          service_type: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          service_type: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          service_type?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          price: string
          duration: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: string
          duration: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: string
          duration?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          service_id: string
          service_name: string
          appointment_date: string
          duration: number
          issue_description: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service_id: string
          service_name: string
          appointment_date: string
          duration: number
          issue_description: string
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          service_id?: string
          service_name?: string
          appointment_date?: string
          duration?: number
          issue_description?: string
          status?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {
      check_table_exists: {
        Args: {
          table_name: string
        }
        Returns: boolean
      }
      get_user_appointments: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          user_id: string
          service_id: string
          service_name: string
          appointment_date: string
          duration: number
          issue_description: string
          status: string
          created_at: string
        }[]
      }
      cancel_appointment: {
        Args: {
          appointment_id: string
        }
        Returns: boolean
      }
      update_appointment_status: {
        Args: {
          p_appointment_id: string
          p_status: string
        }
        Returns: boolean
      }
    }
    Enums: {}
    CompositeTypes: {}
  }
}
