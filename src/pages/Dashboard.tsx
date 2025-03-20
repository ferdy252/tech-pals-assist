
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
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
            <h2 className="text-lg font-medium mb-2">Welcome, {user?.email}</h2>
            <p className="text-gray-600">
              Track your service requests and manage your account from this dashboard.
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Your Service Requests</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
