import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CalendarClock, Clock, Edit, FileText, User, Calendar, X } from 'lucide-react';
import { format } from 'date-fns';

type ServiceRequest = {
  id: string;
  title: string;
  description: string;
  service_type: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type Appointment = {
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

type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'requests');
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  
  // Fetch service requests
  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('service_requests')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setServiceRequests(data || []);
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
    };

    const fetchAppointments = async () => {
      if (!user) return;
      
      try {
        // Check if appointments table exists using a more generic approach
        const { error: tableError } = await supabase.rpc('check_table_exists', { table_name: 'appointments' })
          .single();
        
        // If table doesn't exist or RPC function doesn't exist, we'll just show empty state
        if (tableError) {
          console.log('Appointments table may not exist yet');
          setAppointments([]);
          setLoadingAppointments(false);
          return;
        }
        
        // If table exists, fetch appointments
        const { data, error } = await supabase.rpc('get_user_appointments', { user_id: user.id });
        
        if (error) {
          // Fallback to direct query if RPC doesn't exist
          try {
            const { data: directData, error: directError } = await supabase
              .from('appointments')
              .select('*')
              .eq('user_id', user.id)
              .order('appointment_date', { ascending: true });
            
            if (directError) throw directError;
            
            // Map the data to our Appointment type
            const mappedAppointments: Appointment[] = (directData || []).map((appt: any) => ({
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
            
            setAppointments(mappedAppointments);
          } catch (directError: any) {
            console.error('Error in direct appointment fetch:', directError.message);
            setAppointments([]);
          }
        } else {
          // Map the data from RPC call
          const mappedAppointments: Appointment[] = (data || []).map((appt: any) => ({
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
          
          setAppointments(mappedAppointments);
        }
      } catch (error: any) {
        console.error('Error fetching appointments:', error.message);
        // Don't show error toast as the table might not exist yet
        setAppointments([]);
      } finally {
        setLoadingAppointments(false);
      }
    };

    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        setProfile(data);
        setFullName(data.full_name || '');
        setUsername(data.username || '');
      } catch (error: any) {
        console.error('Error fetching profile:', error.message);
      }
    };

    if (user) {
      fetchServiceRequests();
      fetchAppointments();
      fetchProfile();
    }
  }, [user, toast]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setUpdatingProfile(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: username,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
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
  
  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      // Try using RPC first
      const { error: rpcError } = await supabase.rpc('cancel_appointment', { appointment_id: appointmentId });
      
      if (rpcError) {
        // Fallback to direct update if RPC doesn't exist
        const { error } = await supabase.rpc('update_appointment_status', {
          p_appointment_id: appointmentId,
          p_status: 'cancelled'
        });
        
        if (error) {
          // Last resort: direct update
          const { error: directError } = await supabase
            .from('appointments')
            .update({ status: 'cancelled' })
            .eq('id', appointmentId);
          
          if (directError) throw directError;
        }
      }
      
      // Update local state
      setAppointments(appointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: 'cancelled' } 
          : appointment
      ));
      
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Dashboard</h1>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/service-request')} variant="outline">
                New Service Request
              </Button>
              <Button onClick={signOut} variant="ghost">
                Sign Out
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg mb-6">
            <h2 className="text-lg font-medium mb-2">Welcome, {profile?.full_name || user?.email}</h2>
            <p className="text-gray-600">
              Track your service requests and manage your account from this dashboard.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="requests" className="flex gap-2">
                <FileText className="h-4 w-4" />
                Service Requests
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex gap-2">
                <CalendarClock className="h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="history" className="flex gap-2">
                <Clock className="h-4 w-4" />
                Service History
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex gap-2">
                <User className="h-4 w-4" />
                Personal Info
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Your Service Requests</CardTitle>
                  <CardDescription>
                    View and manage your current service requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  ) : serviceRequests.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {serviceRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="font-medium">{request.title}</TableCell>
                              <TableCell>{request.service_type}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                  {request.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div>{formatDate(request.created_at)}</div>
                                <div className="text-xs text-gray-500">{formatTime(request.created_at)}</div>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-lg bg-gray-50">
                      <p className="text-gray-500">No service requests yet.</p>
                      <Button 
                        onClick={() => navigate('/service-request')} 
                        className="mt-4"
                        variant="outline"
                      >
                        Create Your First Request
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>
                      View and manage your scheduled appointments
                    </CardDescription>
                  </div>
                  <Button onClick={() => navigate('/book-appointment')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </CardHeader>
                <CardContent>
                  {loadingAppointments ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  ) : appointments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {appointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell className="font-medium">{appointment.service_name}</TableCell>
                              <TableCell>
                                <div>{formatDate(appointment.appointment_date)}</div>
                                <div className="text-xs text-gray-500">{formatTime(appointment.appointment_date)}</div>
                              </TableCell>
                              <TableCell>{appointment.duration} min</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                  {appointment.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                {appointment.status === 'scheduled' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleCancelAppointment(appointment.id)}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-lg bg-gray-50">
                      <p className="text-gray-500">No upcoming appointments.</p>
                      <Button 
                        onClick={() => navigate('/book-appointment')} 
                        className="mt-4"
                      >
                        Book Your First Appointment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Service History</CardTitle>
                  <CardDescription>
                    View your past service history and completed requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 border rounded-lg bg-gray-50">
                    <p className="text-gray-500">No service history yet.</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Your completed service requests will appear here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">You cannot change your email address.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleUpdateProfile} 
                      disabled={updatingProfile}
                      className="mt-2"
                    >
                      {updatingProfile ? 'Updating...' : 'Save Changes'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
