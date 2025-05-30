import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { CalendarClock, Clock, FileText, User } from 'lucide-react';

// Types
import { ServiceRequest, Appointment, Profile } from './types';

// Components
import DashboardHeader from './DashboardHeader';
import ServiceRequestsTab from './ServiceRequestsTab';
import AppointmentsTab from './AppointmentsTab';
import ServiceHistoryTab from './ServiceHistoryTab';
import ProfileTab from './ProfileTab';

// Services
import { 
  fetchServiceRequests, 
  fetchAppointments, 
  fetchProfile,
  updateProfile,
  cancelAppointment,
  fetchServiceHistory
} from './dashboardService';

/**
 * Dashboard page component
 */
const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  // State management
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'requests');
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [serviceHistory, setServiceHistory] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  
  // Load data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      try {
        // Fetch service requests
        const requests = await fetchServiceRequests(user.id);
        setServiceRequests(requests);
      } catch (error: any) {
        console.error('Error fetching service requests:', error.message);
        toast({
          title: 'Error fetching requests',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
      
      try {
        // Fetch appointments
        const userAppointments = await fetchAppointments(user.id);
        setAppointments(userAppointments);
      } catch (error) {
        // Don't show error toast as the table might not exist yet
        console.error('Error fetching appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
      
      try {
        // Fetch service history
        const history = await fetchServiceHistory(user.id);
        setServiceHistory(history);
      } catch (error) {
        console.error('Error fetching service history:', error);
      } finally {
        setLoadingHistory(false);
      }
      
      try {
        // Fetch user profile
        const userProfile = await fetchProfile(user.id);
        if (userProfile) {
          setProfile(userProfile);
          setFullName(userProfile.full_name || '');
          setUsername(userProfile.username || '');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user, toast]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setUpdatingProfile(true);
    
    try {
      await updateProfile(user.id, fullName, username);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been updated successfully.',
      });
      
      // Update the local profile state
      setProfile(prev => prev ? { ...prev, full_name: fullName, username: username } : null);
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUpdatingProfile(false);
    }
  };
  
  // Handle appointment cancellation
  const handleCancelAppointment = async (id: string) => {
    try {
      await cancelAppointment(id);
      
      // Update the appointments list
      const updatedAppointments = appointments.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: 'cancelled' } 
          : appointment
      );
      
      setAppointments(updatedAppointments);
      
      toast({
        title: 'Appointment cancelled',
        description: 'Your appointment has been cancelled successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error cancelling appointment',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-16 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Dashboard header with user info */}
          <DashboardHeader profile={profile} />
          
          {/* Dashboard tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6 py-6">
            <TabsList className="mb-6 p-1 bg-gray-100 rounded-full w-auto inline-flex gap-2">
              <TabsTrigger value="requests" className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm flex gap-2 transition-all">
                <FileText className="h-5 w-5 text-blue-600" />
                Service Requests
              </TabsTrigger>
              <TabsTrigger value="appointments" className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm flex gap-2 transition-all">
                <CalendarClock className="h-5 w-5 text-blue-600" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm flex gap-2 transition-all">
                <Clock className="h-5 w-5 text-blue-600" />
                Service History
              </TabsTrigger>
              <TabsTrigger value="profile" className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm flex gap-2 transition-all">
                <User className="h-5 w-5 text-blue-600" />
                Personal Info
              </TabsTrigger>
            </TabsList>
            
            {/* Tab contents */}
            <TabsContent value="requests">
              <ServiceRequestsTab 
                loading={loading} 
                serviceRequests={serviceRequests} 
              />
            </TabsContent>
            
            <TabsContent value="appointments">
              <AppointmentsTab 
                loadingAppointments={loadingAppointments} 
                appointments={appointments} 
                handleCancelAppointment={handleCancelAppointment} 
              />
            </TabsContent>
            
            <TabsContent value="history">
              <ServiceHistoryTab 
                loading={loadingHistory}
                serviceHistory={serviceHistory}
              />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileTab 
                email={user?.email} 
                fullName={fullName} 
                username={username} 
                updatingProfile={updatingProfile} 
                setFullName={setFullName} 
                setUsername={setUsername} 
                handleUpdateProfile={handleUpdateProfile} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
