-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert appointments" ON public.appointments;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.appointments;
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;

-- Create new policies for guest appointments
CREATE POLICY "Anyone can create appointments" ON public.appointments
    FOR INSERT WITH CHECK (
        -- Either the user is authenticated and setting their own user_id
        (auth.uid() IS NOT NULL AND user_id = auth.uid())
        OR 
        -- Or it's a guest appointment (user_id is null and guest fields are provided)
        (user_id IS NULL AND guest_email IS NOT NULL AND guest_name IS NOT NULL)
    );

-- Allow users to view their own appointments and guests to view appointments by email
CREATE POLICY "Users can view their own appointments" ON public.appointments
    FOR SELECT USING (
        -- Authenticated users can see their appointments
        (auth.uid() IS NOT NULL AND user_id = auth.uid())
        OR
        -- Guests can see appointments matching their email
        (user_id IS NULL AND guest_email = current_setting('request.jwt.claims')::json->>'email')
    );

-- Grant basic permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.appointments TO anon, authenticated;
