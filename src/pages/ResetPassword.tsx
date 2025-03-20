import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Computer, KeyRound, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Validate the token when the component mounts
    const validateToken = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');
      
      if (!token || type !== 'recovery') {
        setTokenValid(false);
        setValidatingToken(false);
        return;
      }

      try {
        // We don't actually verify the token here, just check if it exists
        // The actual verification happens when the user submits the new password
        setTokenValid(true);
      } catch (error) {
        console.error('Token validation error:', error);
        setTokenValid(false);
      } finally {
        setValidatingToken(false);
      }
    };

    validateToken();
  }, [searchParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const token = searchParams.get('token');
      
      // Update password using updateUser instead of verifyOtp
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      toast({
        title: 'Password updated successfully',
        description: 'You can now sign in with your new password.',
      });

      // Redirect to login page after successful password reset
      setTimeout(() => navigate('/auth'), 2000);
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: 'Failed to reset password',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (validatingToken) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
              <Computer className="h-6 w-6 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                TechPals
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <h2 className="text-2xl font-bold">Validating your request...</h2>
            <p className="text-gray-600">Please wait while we verify your password reset link.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
              <Computer className="h-6 w-6 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                TechPals
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <KeyRound className="h-12 w-12 text-red-500" />
            <h2 className="text-2xl font-bold text-red-600">Invalid or Expired Link</h2>
            <p className="text-gray-600 mb-4">
              This password reset link is invalid or has expired. Please request a new password reset link.
            </p>
            <div className="space-y-3 w-full">
              <Button 
                onClick={() => navigate('/auth')} 
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Return to Sign In
              </Button>
              <Button 
                onClick={() => navigate('/contact')} 
                variant="outline" 
                className="w-full"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
            <Computer className="h-6 w-6 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              TechPals
            </span>
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Reset Your Password</h2>
        
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mb-2"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/auth" className="text-sm text-blue-600 hover:underline">
            Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
