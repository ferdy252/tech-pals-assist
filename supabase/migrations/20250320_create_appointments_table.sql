-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  issue_description TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies for appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Policy for users to view only their own appointments
CREATE POLICY "Users can view their own appointments"
  ON public.appointments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own appointments
CREATE POLICY "Users can insert their own appointments"
  ON public.appointments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own appointments
CREATE POLICY "Users can update their own appointments"
  ON public.appointments
  FOR UPDATE
  USING (auth.uid() = user_id);

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
