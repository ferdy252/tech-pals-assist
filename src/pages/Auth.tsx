import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Computer, Mail, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);
  
  const { signIn, signUp, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVerificationError(false);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          // Check if this is a verification error
          if (error.message && error.message.includes('verify your email')) {
            setVerificationError(true);
          }
          throw error;
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        else {
          // Redirect to verification pending page with email in state
          navigate('/verification-pending', { state: { email } });
          return; // Early return to prevent the toast from showing
        }
      }
    } catch (error: any) {
      toast({
        title: t('auth.errors.title'),
        description: error.message || t('auth.errors.generic'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address to resend the verification.',
        variant: 'destructive',
      });
      return;
    }
    
    setResendingVerification(true);
    
    try {
      const { error } = await resendVerificationEmail(email);
      
      if (error) throw error;
      
      toast({
        title: 'Verification Email Sent',
        description: 'Please check your inbox for the verification link.',
      });
      
      // Reset verification error state
      setVerificationError(false);
    } catch (error: any) {
      toast({
        title: 'Failed to Resend Verification',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setResendingVerification(false);
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
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {isLogin ? t('auth.signIn.title') : t('auth.signUp.title')}
        </h2>
        
        {verificationError && (
          <Alert className="mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            <AlertTitle className="text-amber-800 dark:text-amber-500">Email Verification Required</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              Your email needs to be verified before you can sign in. 
              <Button 
                variant="link" 
                className="text-amber-800 dark:text-amber-300 p-0 h-auto font-semibold hover:underline" 
                onClick={handleResendVerification}
                disabled={resendingVerification}
              >
                {resendingVerification ? 'Sending...' : 'Resend verification email'}
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">{t('auth.form.fullName')}</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                placeholder={t('auth.form.fullNamePlaceholder')}
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">{t('auth.form.email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('auth.form.emailPlaceholder')}
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">{t('auth.form.password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={t('auth.form.passwordPlaceholder')}
              className="mb-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  {t('auth.signIn.forgotPassword')}
                </Link>
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" disabled={loading}>
            {loading ? t('auth.signIn.processing') : isLogin ? t('auth.signIn.button') : t('auth.signUp.button')}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isLogin ? t('auth.signIn.noAccount') : t('auth.signUp.haveAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
