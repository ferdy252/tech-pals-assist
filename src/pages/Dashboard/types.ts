// Dashboard related types

// Service request type that matches the database schema
export type ServiceRequest = {
  id: string;
  title: string;
  description: string | null;
  service_type: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  user_id: string;
};

// Appointment type
export type Appointment = {
  id: string;
  user_id: string;
  service_id: string;
  service_name: string;
  appointment_date: string;
  duration: number;
  issue_description: string;
  status: string;
  created_at: string;
};

// User profile type
export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};
