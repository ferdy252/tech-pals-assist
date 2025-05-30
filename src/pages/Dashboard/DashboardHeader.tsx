import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { Profile } from './types';
import { useAuth } from '@/context/AuthContext';

type DashboardHeaderProps = {
  profile: Profile | null;
};

/**
 * Header component for the dashboard with modern gradient and user profile
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ profile }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  return (
    <>
      {/* Header with modern gradient background and pattern overlay */}
      <div className="relative bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 text-white px-8 py-6 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` 
             }}>
        </div>
        
        <div className="flex justify-between items-center relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/service-request')} className="bg-white text-blue-600 hover:bg-blue-50 font-medium shadow-sm transition-all duration-200 px-5">
              New Service Request
            </Button>
            
            {/* User avatar and sign out button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-blue-600/20 rounded-full pl-2 pr-1 py-1 hover:bg-blue-600/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center overflow-hidden mr-2">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="User avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <Button onClick={signOut} variant="ghost" className="text-white hover:bg-transparent hover:text-blue-100 p-1 h-auto">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Welcome card */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Welcome, {profile?.full_name || "User"}</h2>
        <p className="text-gray-700">
          Track your service requests and manage your account from this dashboard.
        </p>
      </div>
    </>
  );
};

export default DashboardHeader;
