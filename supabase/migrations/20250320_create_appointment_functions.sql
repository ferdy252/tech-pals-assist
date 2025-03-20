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
