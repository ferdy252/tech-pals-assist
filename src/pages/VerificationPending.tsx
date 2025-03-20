import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Computer, Mail, RefreshCw } from 'lucide-react';

const VerificationPending = () => {
  const location = useLocation();
  const email = location.state?.email || '';
  const [resending, setResending] = useState(false);
  const { resendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: 'Email address missing',
        description: 'Please go back to the sign-up page and try again.',
        variant: 'destructive',
      });
      return;
    }

    setResending(true);
    try {
      const { error } = await resendVerificationEmail(email);
      if (error) throw error;

      toast({
        title: 'Verification email resent',
        description: 'Please check your inbox for the verification link.',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to resend verification email',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setResending(false);
    }
  };

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

        <div className="flex justify-center mb-6">
          <Mail className="h-16 w-16 text-blue-500" />
        </div>

        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        
        <p className="text-gray-600 mb-6">
          We've sent a verification email to <strong>{email}</strong>.
          Please check your inbox and click the verification link to activate your account.
        </p>
        
        <p className="text-gray-600 mb-8">
          If you don't see the email in your inbox, check your spam folder or click the button below to resend the verification email.
        </p>

        <div className="space-y-4">
          <Button 
            onClick={handleResendVerification} 
            disabled={resending}
            className="w-full flex items-center justify-center gap-2"
          >
            {resending ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              <>Resend Verification Email</>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/auth')}
          >
            Back to Sign In
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team at:</p>
          <p className="mt-1">
            <a href="tel:5705352472" className="text-blue-600 hover:underline">(570) 535-2472</a> or <a href="mailto:support@techpals.info" className="text-blue-600 hover:underline">support@techpals.info</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
