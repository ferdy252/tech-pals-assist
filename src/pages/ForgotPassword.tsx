import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Computer, Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!validateEmail(email)) {
      return;
    }
    
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setEmailSent(true);
      toast({
        title: 'Recovery email sent',
        description: 'Check your email for a password reset link.',
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: 'Error sending recovery email',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
        
        {!emailSent ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Reset Your Password</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  required
                  placeholder="you@example.com"
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  title="Please enter a valid email address"
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Check Your Email</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We've sent a password reset link to <strong className="text-gray-800 dark:text-gray-200">{email}</strong>.
              Please check your email and follow the instructions to reset your password.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you don't see the email, check your spam folder or try again.
            </p>
            <Button 
              onClick={() => setEmailSent(false)} 
              variant="outline" 
              className="w-full mb-3 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Try Again
            </Button>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/auth" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
