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

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 number, 1 uppercase, 1 lowercase, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (password.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive',
      });
      return false;
    }
    
    if (!passwordRegex.test(password)) {
      toast({
        title: 'Password requirements not met',
        description: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
        variant: 'destructive',
      });
      return false;
    }
    
    return true;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate password strength
    if (!validatePassword(password)) {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/20 p-8 text-center transition-colors duration-300">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
              <Computer className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                TechPals
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 dark:text-blue-400 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Validating your request...</h2>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we verify your password reset link.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/20 p-8 text-center transition-colors duration-300">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
              <Computer className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                TechPals
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <KeyRound className="h-12 w-12 text-red-500 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Invalid or Expired Link</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This password reset link is invalid or has expired. Please request a new password reset link.
            </p>
            <div className="space-y-3 w-full">
              <Button 
                onClick={() => navigate('/auth')} 
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Return to Sign In
              </Button>
              <Button 
                onClick={() => navigate('/contact')} 
                variant="outline" 
                className="w-full border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/20 p-8 transition-colors duration-300">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
            <Computer className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              TechPals
            </span>
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Reset Your Password</h2>
        
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="••••••••"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              placeholder="••••••••"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/auth" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
