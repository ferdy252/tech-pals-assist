import { supabase } from '@/integrations/supabase/client';
import { ServiceRequest, Appointment, Profile } from './types';
import { User } from '@supabase/supabase-js';

/**
 * Fetch service requests for a user
 */
export const fetchServiceRequests = async (userId: string): Promise<ServiceRequest[]> => {
  const { data, error } = await supabase
    .from('service_requests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

/**
 * Fetch appointments for a user
 */
export const fetchAppointments = async (userId: string): Promise<Appointment[]> => {
  try {
    // Check if appointments table exists using a more generic approach
    const { error: tableError } = await supabase.rpc('check_table_exists', { p_table_name: 'appointments' })
      .single();
    
    // If table doesn't exist or RPC function doesn't exist, return empty array
    if (tableError) {
      console.log('Appointments table may not exist yet');
      return [];
    }
    
    // If table exists, fetch appointments
    const { data, error } = await supabase.rpc('get_user_appointments', { user_id: userId });
    
    if (error) {
      // Fallback to direct query if RPC doesn't exist
      const { data: directData, error: directError } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', userId)
        .order('appointment_date', { ascending: true });
      
      if (directError) throw directError;
      
      // Map the data to our Appointment type
      return (directData || []).map((appt: any) => ({
        id: appt.id,
        user_id: appt.user_id,
        service_id: appt.service_id,
        service_name: appt.service_name,
        appointment_date: appt.appointment_date,
        duration: appt.duration,
        issue_description: appt.issue_description,
        status: appt.status,
        created_at: appt.created_at
      }));
    } else {
      // Map the data from RPC call
      return (data || []).map((appt: any) => ({
        id: appt.id,
        user_id: appt.user_id,
        service_id: appt.service_id,
        service_name: appt.service_name,
        appointment_date: appt.appointment_date,
        duration: appt.duration,
        issue_description: appt.issue_description,
        status: appt.status,
        created_at: appt.created_at
      }));
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};

/**
 * Fetch user profile
 */
export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data as Profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (
  userId: string, 
  fullName: string, 
  username: string
): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      username: username,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
  
  if (error) throw error;
};

/**
 * Cancel an appointment
 */
/**
 * Fetch service history (completed service requests) for a user
 */
export const fetchServiceHistory = async (userId: string): Promise<ServiceRequest[]> => {
  const { data, error } = await supabase
    .from('service_requests')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('updated_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

/**
 * Cancel an appointment
 */
export const cancelAppointment = async (appointmentId: string): Promise<void> => {
  try {
    // Try using RPC first
    const { error } = await supabase.rpc('cancel_appointment', { appointment_id: appointmentId });
    
    if (error) {
      // Fallback to direct update if RPC doesn't exist
      const { error: statusError } = await supabase.rpc('update_appointment_status', { 
        appointment_id: appointmentId, 
        new_status: 'cancelled' 
      });
      
      if (statusError) {
        // Last resort: direct update
        const { error: updateError } = await supabase
          .from('appointments')
          .update({ status: 'cancelled' })
          .eq('id', appointmentId);
        
        if (updateError) throw updateError;
      }
    }
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};
