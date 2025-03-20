import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Computer, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');
      
      if (!token || type !== 'email_confirmation') {
        setVerificationStatus('error');
        setErrorMessage('Invalid verification link. Please try again or contact support.');
        return;
      }

      try {
        // Verify the token with Supabase
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        });

        if (error) {
          throw error;
        }

        setVerificationStatus('success');
      } catch (error: any) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
        setErrorMessage(error.message || 'Failed to verify your email. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams]);

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

        {verificationStatus === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <h2 className="text-2xl font-bold">Verifying your email...</h2>
            <p className="text-gray-600">Please wait while we confirm your email address.</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold text-green-600">Email Verified!</h2>
            <p className="text-gray-600 mb-4">
              Your email has been successfully verified. You can now sign in to your account.
            </p>
            <Button 
              onClick={() => navigate('/auth')} 
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Sign In
            </Button>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-12 w-12 text-red-500" />
            <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
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
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
