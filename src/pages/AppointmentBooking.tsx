import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays, addWeeks, startOfDay, setHours, setMinutes, isBefore } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock, ArrowLeft } from 'lucide-react';
import { getServiceDetail } from '@/pages/services/serviceData';

type ServiceType = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: number; // in minutes
};

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
];

const AppointmentBooking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [services, setServices] = useState<ServiceType[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingServices, setLoadingServices] = useState(true);
  
  // Parse URL parameters to get pre-selected service
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceSlug = searchParams.get('service');
    
    if (serviceSlug) {
      // Try to get service details from serviceData first
      const serviceDetail = getServiceDetail(serviceSlug);
      if (serviceDetail) {
        // Set a default issue description based on the service
        setIssue(`I need help with ${serviceDetail.title.toLowerCase()}.`);
      }
    }
  }, [location]);
  
  // Disable dates in the past and weekends
  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    const day = date.getDay();
    // 0 is Sunday, 6 is Saturday
    return isBefore(date, today) || day === 0 || day === 6;
  };
  
  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // First check if services table exists
        const { error: tableCheckError } = await supabase
          .from('services')
          .select('count')
          .limit(1)
          .single();
        
        // If table doesn't exist yet, use default services
        if (tableCheckError) {
          console.log('Services table may not exist yet, using defaults');
          const defaultServices = [
            { id: '1', name: 'Computer Repair', description: 'Hardware and software troubleshooting', price: '$75', duration: 60 },
            { id: '2', name: 'Virus Removal', description: 'Malware and virus removal', price: '$60', duration: 45 },
            { id: '3', name: 'Data Recovery', description: 'Recover lost or deleted files', price: '$90', duration: 90 },
            { id: '4', name: 'Network Setup', description: 'Home or small business network setup', price: '$120', duration: 120 },
            { id: '5', name: 'Software Installation', description: 'Install and configure software', price: '$45', duration: 30 },
          ];
          setServices(defaultServices);
          
          // Set pre-selected service if it exists in URL
          const searchParams = new URLSearchParams(location.search);
          const serviceSlug = searchParams.get('service');
          
          if (serviceSlug) {
            // Map service slug to default service ID
            const slugToServiceMap: Record<string, string> = {
              'computer-repair': '1',
              'virus-removal': '2',
              'data-recovery': '3',
              'network-setup': '4',
              'software-installation': '5'
            };
            
            if (slugToServiceMap[serviceSlug]) {
              setSelectedService(slugToServiceMap[serviceSlug]);
            }
          }
          
          setLoadingServices(false);
          return;
        }
        
        // If table exists, fetch services
        const { data, error } = await supabase
          .from('services')
          .select('*');
        
        if (error) throw error;
        
        // Map the data to our ServiceType format
        if (data && data.length > 0) {
          const mappedServices: ServiceType[] = data.map((service: any) => ({
            id: service.id,
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration
          }));
          setServices(mappedServices);
          
          // Set pre-selected service if it exists in URL
          const searchParams = new URLSearchParams(location.search);
          const serviceSlug = searchParams.get('service');
          
          if (serviceSlug) {
            // Try to find a service that matches the slug
            const serviceDetail = getServiceDetail(serviceSlug);
            if (serviceDetail) {
              // Find a matching service by name
              const matchingService = mappedServices.find(s => 
                s.name.toLowerCase() === serviceDetail.title.toLowerCase() ||
                s.name.toLowerCase().includes(serviceDetail.title.toLowerCase()) ||
                serviceDetail.title.toLowerCase().includes(s.name.toLowerCase())
              );
              
              if (matchingService) {
                setSelectedService(matchingService.id);
              }
            }
          }
        } else {
          // Fallback to default services if no data
          const defaultServices = [
            { id: '1', name: 'Computer Repair', description: 'Hardware and software troubleshooting', price: '$75', duration: 60 },
            { id: '2', name: 'Virus Removal', description: 'Malware and virus removal', price: '$60', duration: 45 },
            { id: '3', name: 'Data Recovery', description: 'Recover lost or deleted files', price: '$90', duration: 90 },
            { id: '4', name: 'Network Setup', description: 'Home or small business network setup', price: '$120', duration: 120 },
            { id: '5', name: 'Software Installation', description: 'Install and configure software', price: '$45', duration: 30 },
          ];
          setServices(defaultServices);
        }
      } catch (error: any) {
        console.error('Error fetching services:', error.message);
        toast({
          title: 'Error loading services',
          description: error.message,
          variant: 'destructive',
        });
        
        // Fallback to default services on error
        const defaultServices = [
          { id: '1', name: 'Computer Repair', description: 'Hardware and software troubleshooting', price: '$75', duration: 60 },
          { id: '2', name: 'Virus Removal', description: 'Malware and virus removal', price: '$60', duration: 45 },
          { id: '3', name: 'Data Recovery', description: 'Recover lost or deleted files', price: '$90', duration: 90 },
          { id: '4', name: 'Network Setup', description: 'Home or small business network setup', price: '$120', duration: 120 },
          { id: '5', name: 'Software Installation', description: 'Install and configure software', price: '$45', duration: 30 },
        ];
        setServices(defaultServices);
      } finally {
        setLoadingServices(false);
      }
    };
    
    fetchServices();
  }, [toast, location]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: 'Missing information',
        description: 'Please select a service, date, and time for your appointment.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Parse the time string
      const [hourStr, minuteStr, period] = selectedTime.match(/([0-9]+):([0-9]+)\s*(AM|PM)/)?.slice(1) || [];
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      
      // Convert to 24-hour format
      if (period === 'PM' && hour < 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      
      // Create appointment date
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(hour, minute, 0, 0);
      
      // Get service details
      const service = services.find(s => s.id === selectedService);
      
      // First check if appointments table exists
      const { error: tableCheckError } = await supabase
        .from('appointments')
        .select('count')
        .limit(1)
        .single();
      
      // If table doesn't exist, show error
      if (tableCheckError) {
        console.error('Appointments table does not exist:', tableCheckError.message);
        toast({
          title: 'System error',
          description: 'The appointment system is not yet fully set up. Please try again later or contact support.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
      
      // Create appointment in database
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            user_id: user?.id,
            service_id: selectedService,
            service_name: service?.name,
            appointment_date: appointmentDate.toISOString(),
            duration: service?.duration || 60,
            issue_description: issue,
            status: 'scheduled',
          },
        ])
        .select();
      
      if (error) throw error;
      
      toast({
        title: 'Appointment scheduled',
        description: `Your appointment has been scheduled for ${format(appointmentDate, 'EEEE, MMMM d, yyyy')} at ${selectedTime}.`,
      });
      
      // Redirect to dashboard
      navigate('/dashboard', { state: { activeTab: 'appointments' } });
    } catch (error: any) {
      console.error('Error scheduling appointment:', error.message);
      toast({
        title: 'Error scheduling appointment',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-10">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4 pl-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Schedule an Appointment</CardTitle>
            <CardDescription>
              Book a time with our tech support specialists to resolve your issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service">Select Service</Label>
                <Select
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <SelectTrigger id="service" className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingServices ? (
                      <div className="p-2 text-center">
                        <p className="text-sm text-gray-500">Loading services...</p>
                      </div>
                    ) : (
                      services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div>
                            <span>{service.name}</span>
                            <span className="ml-2 text-sm text-gray-500">{service.price}</span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {selectedService && (
                  <p className="text-sm text-gray-500 mt-1">
                    {services.find(s => s.id === selectedService)?.description}
                    <br />
                    Duration: {services.find(s => s.id === selectedService)?.duration} minutes
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={disabledDays}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Select Time</Label>
                  <Select
                    value={selectedTime}
                    onValueChange={setSelectedTime}
                    disabled={!selectedDate}
                  >
                    <SelectTrigger id="time" className="w-full">
                      <SelectValue placeholder="Pick a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issue">Describe Your Issue</Label>
                <Textarea
                  id="issue"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Please describe the issue you're experiencing..."
                  className="min-h-[100px]"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Scheduling..." : "Schedule Appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentBooking;
