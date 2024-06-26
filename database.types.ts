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
      appointments: {
        Row: {
          created_at: string
          department_id: string
          doctor_id: string
          id: string
          patient_id: string
          time: string
        }
        Insert: {
          created_at?: string
          department_id: string
          doctor_id: string
          id?: string
          patient_id: string
          time: string
        }
        Update: {
          created_at?: string
          department_id?: string
          doctor_id?: string
          id?: string
          patient_id?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          created_at: string
          id: string
          staff_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          staff_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          staff_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_doctors_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      "lab _tests": {
        Row: {
          created_at: string
          id: number
          note: Json | null
          patient_id: string
          staff_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          note?: Json | null
          patient_id: string
          staff_id: string
        }
        Update: {
          created_at?: string
          id?: number
          note?: Json | null
          patient_id?: string
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab _tests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab _tests_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_orders: {
        Row: {
          created_at: string
          id: number
          patient_id: string
          staff_id: string
          test: string
        }
        Insert: {
          created_at?: string
          id?: number
          patient_id: string
          staff_id: string
          test: string
        }
        Update: {
          created_at?: string
          id?: number
          patient_id?: string
          staff_id?: string
          test?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_orders_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_orders_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      medicines: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      patient_details: {
        Row: {
          created_at: string
          height: number
          id: number
          patient_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          height: number
          id?: number
          patient_id: string
          weight: number
        }
        Update: {
          created_at?: string
          height?: number
          id?: number
          patient_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_patient_details_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_notes: {
        Row: {
          created_at: string
          doctor_id: string | null
          id: string
          note: Json | null
          patient_id: string | null
        }
        Insert: {
          created_at?: string
          doctor_id?: string | null
          id?: string
          note?: Json | null
          patient_id?: string | null
        }
        Update: {
          created_at?: string
          doctor_id?: string | null
          id?: string
          note?: Json | null
          patient_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_notes_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_patient_notes_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          birthdate: string | null
          created_at: string
          email: string | null
          gender: string | null
          id: string
          name: string
          phone_num: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          birthdate?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          name: string
          phone_num?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          birthdate?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          name?: string
          phone_num?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_patients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_line: {
        Row: {
          created_at: string
          dosage: string | null
          dosage_time: string | null
          dosage_type: string | null
          id: number
          medicine_id: string
          prescription_id: number
        }
        Insert: {
          created_at?: string
          dosage?: string | null
          dosage_time?: string | null
          dosage_type?: string | null
          id?: number
          medicine_id: string
          prescription_id: number
        }
        Update: {
          created_at?: string
          dosage?: string | null
          dosage_time?: string | null
          dosage_type?: string | null
          id?: number
          medicine_id?: string
          prescription_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "prescription_line_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescription_line_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          created_at: string
          dispensed_at: string | null
          id: number
          is_recurring: boolean
          next_dispense: string | null
          patient_id: string
          staff_id: string
        }
        Insert: {
          created_at?: string
          dispensed_at?: string | null
          id?: number
          is_recurring?: boolean
          next_dispense?: string | null
          patient_id: string
          staff_id: string
        }
        Update: {
          created_at?: string
          dispensed_at?: string | null
          id?: number
          is_recurring?: boolean
          next_dispense?: string | null
          patient_id?: string
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      staff: {
        Row: {
          address: string | null
          created_at: string
          department_id: string | null
          email: string | null
          id: string
          name: string
          phone_num: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          department_id?: string | null
          email?: string | null
          id?: string
          name: string
          phone_num?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          department_id?: string | null
          email?: string | null
          id?: string
          name?: string
          phone_num?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_staff_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
    }
    Enums: {
      app_permission:
        | "patients.read"
        | "patients.write"
        | "patients.delete"
        | "patients.update"
        | "staff.read"
        | "staff.write"
        | "staff.delete"
        | "staff.update"
        | "appointments.read"
        | "appointments.write"
        | "appointments.delete"
        | "appointments.update"
        | "prescriptions.read"
        | "prescriptions.write"
        | "prescriptions.delete"
        | "prescriptions.update"
        | "tests.read"
        | "tests.write"
        | "tests.update"
        | "tests.delete"
        | "billing.read"
        | "billing.update"
        | "billing.delete"
        | "billing.write"
        | "supplies.read"
        | "supplies.update"
        | "supplies.delete"
        | "supplies.write"
        | "reports.read"
        | "system_config"
        | "user_management"
      app_role:
        | "staff_mngmt"
        | "staff_doctor"
        | "staff_nurse"
        | "staff_nurseadv"
        | "staff_medtech"
        | "staff_pharmacist"
        | "staff_dietician"
        | "staff_social"
        | "staff_physical"
        | "staff_occupational"
        | "staff_speechpatho"
        | "staff_accnt"
        | "staff_medrecord"
        | "staff_admins"
        | "staff_clerks"
        | "staff_env"
        | "staff_security"
        | "patient"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
