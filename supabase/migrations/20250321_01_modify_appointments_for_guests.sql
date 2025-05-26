-- Modify appointments table to make user_id nullable and add guest information fields
ALTER TABLE public.appointments
  ALTER COLUMN user_id DROP NOT NULL,
  ADD COLUMN guest_name TEXT,
  ADD COLUMN guest_email TEXT,
  ADD COLUMN guest_phone TEXT;

-- Update RLS policies to allow guest appointments
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can insert their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;

-- Create new policies
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
