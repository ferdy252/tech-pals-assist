
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const serviceTypes = [
  'Computer Repair',
  'Network Setup',
  'Software Installation',
  'Data Recovery',
  'Tech Consultation',
  'Website Development',
  'Hardware Upgrade',
  'Virus Removal',
  'Cloud Services',
  'Other'
];

const ServiceRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [loading, setLoading] = useState(false);
  
  const validateForm = () => {
    // Validate title
    if (!title || title.trim().length < 5) {
      toast({
        title: "Title too short",
        description: "Please provide a more descriptive title (at least 5 characters).",
        variant: "destructive",
      });
      return false;
    }

    // Validate description
    if (!description || description.trim().length < 20) {
      toast({
        title: "Description too short",
        description: "Please provide a more detailed description of your issue (at least 20 characters).",
        variant: "destructive",
      });
      return false;
    }

    // Validate service type
    if (!serviceType || !serviceTypes.includes(serviceType)) {
      toast({
        title: "Invalid service type",
        description: "Please select a valid service type from the list.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a service request.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate a unique ID for the service
      const serviceId = `svc-${Date.now()}`;
      
      const { error } = await supabase.from('appointments').insert({
        id: `appt-${Date.now()}`,
        user_id: user.id,
        service_id: serviceId,
        service_name: serviceType,
        issue_description: `${title}: ${description}`,
        status: 'pending',
        appointment_date: new Date().toISOString(),
        duration: 60, // Default 60 minutes
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        guest_name: user.email?.split('@')[0] || 'Guest',
        guest_email: user.email || '',
        guest_phone: '' // Optional field
      });
      
      if (error) throw error;
      
      toast({
        title: "Service request submitted",
        description: "Your request has been successfully submitted.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error submitting request",
        description: error.message || "Failed to submit your request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">New Service Request</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                minLength={5}
                maxLength={100}
                placeholder="Brief description of your issue"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={20}
                placeholder="Please provide details about your technical issue or service request"
                rows={6}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 20 characters. Include any error messages, steps to reproduce, and what you've tried.</p>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Service Request'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequest;
