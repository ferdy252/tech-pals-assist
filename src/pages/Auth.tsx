import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Computer } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
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
        title: "Authentication error",
        description: error.message || "Failed to authenticate",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Sign in to your account' : 'Create an account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mb-2"
            />
            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
