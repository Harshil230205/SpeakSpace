
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "sonner";

export type UserRole = 'moderator' | 'participant' | 'evaluator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database for demo purposes (in a real app, this would be connected to MongoDB)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Moderator',
    email: 'moderator@example.com',
    role: 'moderator',
    profileImage: 'https://ui-avatars.com/api/?name=John+Moderator&background=4F46E5&color=fff'
  },
  {
    id: '2',
    name: 'Jane Participant',
    email: 'participant@example.com',
    role: 'participant',
    profileImage: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff'
  },
  {
    id: '3',
    name: 'Alex Evaluator',
    email: 'evaluator@example.com',
    role: 'evaluator',
    profileImage: 'https://ui-avatars.com/api/?name=Alex+Evaluator&background=F59E0B&color=fff'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('speakspace_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email && u.role === role);
      
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('speakspace_user', JSON.stringify(user));
        toast.success("Logged in successfully!");
      } else {
        throw new Error('Invalid credentials or role');
      }
    } catch (error) {
      toast.error("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        role,
        profileImage: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=${
          role === 'moderator' ? '4F46E5' : role === 'participant' ? '10B981' : 'F59E0B'
        }&color=fff`
      };
      
      // In a real app, you would save this to your database
      mockUsers.push(newUser);
      
      setCurrentUser(newUser);
      localStorage.setItem('speakspace_user', JSON.stringify(newUser));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('speakspace_user');
    toast.info("Logged out successfully");
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
