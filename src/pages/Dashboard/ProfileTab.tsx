import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

type ProfileTabProps = {
  email: string | undefined;
  fullName: string;
  username: string;
  updatingProfile: boolean;
  setFullName: (value: string) => void;
  setUsername: (value: string) => void;
  handleUpdateProfile: () => Promise<void>;
};

/**
 * Profile tab content for the dashboard
 */
const ProfileTab: React.FC<ProfileTabProps> = ({
  email,
  fullName,
  username,
  updatingProfile,
  setFullName,
  setUsername,
  handleUpdateProfile
}) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
        <CardDescription className="text-gray-600">
          Update your personal information and account details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 max-w-md bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
            <Input
              id="email"
              value={email || ''}
              disabled
              className="bg-gray-50 border-gray-200"
            />
            <p className="text-xs text-gray-500">You cannot change your email address</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="border-gray-200 focus:border-blue-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="border-gray-200 focus:border-blue-400"
            />
          </div>
          
          <Button 
            onClick={handleUpdateProfile} 
            disabled={updatingProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white mt-2 w-full"
          >
            {updatingProfile ? 'Updating...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
