
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { AtSign, Lock, ArrowRight, UserPlus, UserRound, Loader2 } from 'lucide-react';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up state
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpOtp, setSignUpOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!signInEmail || !signInPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (signInEmail.endsWith('@edu') && signInPassword === 'password') {
        toast.success('Signed in successfully');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    }, 1500);
  };
  
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for email with .edu domain
    if (!signUpEmail) {
      toast.error('Please enter your email');
      return;
    }
    
    if (!signUpEmail.endsWith('.edu')) {
      toast.error('Please use a valid .edu email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      toast.success('OTP sent to your email');
    }, 1500);
  };
  
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpOtp) {
      toast.error('Please enter the OTP');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, any 6-digit OTP works
      if (signUpOtp.length === 6) {
        toast.success('OTP verified successfully');
        navigate('/profile');
      } else {
        toast.error('Invalid OTP');
      }
    }, 1500);
  };
  
  return (
    <Tabs defaultValue="signin" className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="signin" className="text-sm font-medium">
          Sign In
        </TabsTrigger>
        <TabsTrigger value="signup" className="text-sm font-medium">
          Sign Up
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="signin">
        <Card className="border-none shadow-soft animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to manage your print jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@college.edu"
                    className="pl-10 input-field"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-xerox-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 input-field"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full mt-6 bg-xerox hover:bg-xerox-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="signup">
        <Card className="border-none shadow-soft animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Create an account</CardTitle>
            <CardDescription>
              Create your account using your college email
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">College Email</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.name@college.edu"
                      className="pl-10 input-field"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    We only accept .edu email addresses for verification.
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-xerox hover:bg-xerox-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Send Verification Code
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="input-field"
                    value={signUpOtp}
                    onChange={(e) => setSignUpOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Enter the 6-digit code sent to {signUpEmail}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    className="text-sm text-xerox-600 hover:underline"
                    onClick={() => setOtpSent(false)}
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    className="text-sm text-xerox-600 hover:underline"
                    onClick={handleSendOtp}
                  >
                    Resend code
                  </button>
                </div>
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-xerox hover:bg-xerox-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <UserRound className="mr-2 h-4 w-4" />
                      Verify & Continue
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
