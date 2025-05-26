-- First create tables

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  issue_description TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT
);

-- Create RLS policies for appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own appointments
CREATE POLICY "Users can view their own appointments"
  ON public.appointments
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy for users to insert appointments (both authenticated and guests)
CREATE POLICY "Anyone can insert appointments"
  ON public.appointments
  FOR INSERT
  WITH CHECK (true);

-- Policy for users to update their own appointments
CREATE POLICY "Users can update their own appointments"
  ON public.appointments
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create a view for staff to see all appointments
CREATE OR REPLACE VIEW public.all_appointments AS
SELECT 
  a.*,
  CASE 
    WHEN a.user_id IS NOT NULL THEN u.email
    ELSE a.guest_email
  END AS contact_email,
  CASE 
    WHEN a.user_id IS NOT NULL THEN COALESCE(u.raw_user_meta_data->>'full_name', u.email)
    ELSE a.guest_name
  END AS contact_name
FROM 
  public.appointments a
  LEFT JOIN auth.users u ON a.user_id = u.id;

-- Create policy to allow staff to view all appointments (in a real app, you'd restrict this to staff)
CREATE POLICY "Staff can view all appointments" 
  ON public.appointments 
  FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'is_staff' = 'true'));

-- Create services table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Make services publicly readable
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);

-- Insert default services if none exist
INSERT INTO public.services (name, description, price, duration)
SELECT 
  unnest(ARRAY['Computer Repair', 'Virus Removal', 'Data Recovery', 'Network Setup', 'Software Installation']) as name,
  unnest(ARRAY['Hardware and software troubleshooting', 'Malware and virus removal', 'Recover lost or deleted files', 'Home or small business network setup', 'Install and configure software']) as description,
  unnest(ARRAY['$75', '$60', '$90', '$120', '$45']) as price,
  unnest(ARRAY[60, 45, 90, 120, 30]) as duration
WHERE NOT EXISTS (SELECT 1 FROM public.services LIMIT 1);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to appointments table
DROP TRIGGER IF EXISTS update_appointments_updated_at ON public.appointments;
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger to services table
DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Now create functions that depend on the tables

-- Function to check if a table exists
CREATE OR REPLACE FUNCTION public.check_table_exists(table_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = check_table_exists.table_name
  );
END;
$$;

-- Grant access to the function
GRANT EXECUTE ON FUNCTION public.check_table_exists TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_table_exists TO service_role;

-- Function to get user appointments
CREATE OR REPLACE FUNCTION public.get_user_appointments(user_id uuid)
RETURNS SETOF public.appointments
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.appointments
  WHERE appointments.user_id = get_user_appointments.user_id
  ORDER BY appointment_date ASC;
END;
$$;

-- Grant access to the function
GRANT EXECUTE ON FUNCTION public.get_user_appointments TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_appointments TO service_role;

-- Function to cancel an appointment
CREATE OR REPLACE FUNCTION public.cancel_appointment(appointment_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_appointment_exists boolean;
BEGIN
  -- Check if the appointment exists and belongs to the current user
  SELECT 
    EXISTS(SELECT 1 FROM public.appointments WHERE id = appointment_id),
    user_id
  INTO v_appointment_exists, v_user_id
  FROM public.appointments
  WHERE id = appointment_id;
  
  -- If appointment doesn't exist, return false
  IF NOT v_appointment_exists THEN
    RETURN false;
  END IF;
  
  -- Check if the current user owns this appointment
  IF v_user_id != auth.uid() THEN
    RETURN false;
  END IF;
  
  -- Update the appointment status
  UPDATE public.appointments
  SET status = 'cancelled'
  WHERE id = appointment_id;
  
  RETURN true;
END;
$$;

-- Grant access to the function
GRANT EXECUTE ON FUNCTION public.cancel_appointment TO authenticated;
GRANT EXECUTE ON FUNCTION public.cancel_appointment TO service_role;

-- Function to update appointment status (more generic version)
CREATE OR REPLACE FUNCTION public.update_appointment_status(p_appointment_id uuid, p_status text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_appointment_exists boolean;
BEGIN
  -- Check if the appointment exists and belongs to the current user
  SELECT 
    EXISTS(SELECT 1 FROM public.appointments WHERE id = p_appointment_id),
    user_id
  INTO v_appointment_exists, v_user_id
  FROM public.appointments
  WHERE id = p_appointment_id;
  
  -- If appointment doesn't exist, return false
  IF NOT v_appointment_exists THEN
    RETURN false;
  END IF;
  
  -- Check if the current user owns this appointment
  IF v_user_id != auth.uid() THEN
    RETURN false;
  END IF;
  
  -- Update the appointment status
  UPDATE public.appointments
  SET status = p_status
  WHERE id = p_appointment_id;
  
  RETURN true;
END;
$$;

-- Grant access to the function
GRANT EXECUTE ON FUNCTION public.update_appointment_status TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_appointment_status TO service_role;
