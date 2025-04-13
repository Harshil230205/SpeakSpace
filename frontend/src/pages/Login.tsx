
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, User, MessageSquare } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('participant');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password, role);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo login info
  const demoUsers = [
    { email: 'moderator@example.com', password: 'password', role: 'moderator' },
    { email: 'participant@example.com', password: 'password', role: 'participant' },
    { email: 'evaluator@example.com', password: 'password', role: 'evaluator' },
  ];

  const handleDemoLogin = async (demoEmail: string, demoRole: UserRole) => {
    setEmail(demoEmail);
    setPassword('password');
    setRole(demoRole);
    
    try {
      setIsSubmitting(true);
      await login(demoEmail, 'password', demoRole);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout requireAuth={false}>
      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Log in to SpeakSpace</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moderator" className="flex items-center">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-speakspace-moderator" />
                          <span>Moderator</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="participant">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-speakspace-participant" />
                          <span>Participant</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="evaluator">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-speakspace-evaluator" />
                          <span>Evaluator</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Log in'}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or try a demo account</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-speakspace-moderator bg-opacity-10 hover:bg-opacity-20 border-speakspace-moderator text-speakspace-moderator hover:text-speakspace-moderator"
                    onClick={() => handleDemoLogin('moderator@example.com', 'moderator')}
                    disabled={isSubmitting}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Login as Moderator
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-speakspace-participant bg-opacity-10 hover:bg-opacity-20 border-speakspace-participant text-speakspace-participant hover:text-speakspace-participant"
                    onClick={() => handleDemoLogin('participant@example.com', 'participant')}
                    disabled={isSubmitting}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login as Participant
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-speakspace-evaluator bg-opacity-10 hover:bg-opacity-20 border-speakspace-evaluator text-speakspace-evaluator hover:text-speakspace-evaluator"
                    onClick={() => handleDemoLogin('evaluator@example.com', 'evaluator')}
                    disabled={isSubmitting}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Login as Evaluator
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-speakspace-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
