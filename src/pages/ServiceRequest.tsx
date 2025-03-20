
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase.from('service_requests').insert({
        user_id: user.id,
        title,
        description,
        service_type: serviceType,
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
                placeholder="Brief description of your issue"
              />
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
                placeholder="Please provide details about your technical issue or service request"
                rows={6}
              />
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
