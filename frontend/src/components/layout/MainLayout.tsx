
import { ReactNode, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Users, Calendar, MessageSquare, LogOut, ChevronDown, User, Settings } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MainLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case 'moderator':
      return 'bg-speakspace-moderator';
    case 'participant':
      return 'bg-speakspace-participant';
    case 'evaluator':
      return 'bg-speakspace-evaluator';
    default:
      return 'bg-gray-500';
  }
};

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'moderator':
      return <Calendar className="h-4 w-4" />;
    case 'participant':
      return <User className="h-4 w-4" />;
    case 'evaluator':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return null;
  }
};

const MainLayout = ({ children, requireAuth = true }: MainLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Get navigation links based on user role
  const getNavLinks = () => {
    if (!currentUser) return [];

    const commonLinks = [
      { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    ];

    switch (currentUser.role) {
      case 'moderator':
        return [
          ...commonLinks,
          { name: 'Manage Sessions', path: '/moderator/sessions', icon: <Calendar className="h-5 w-5" /> },
          { name: 'Manage Participants', path: '/moderator/participants', icon: <Users className="h-5 w-5" /> },
        ];
      case 'participant':
        return [
          ...commonLinks,
          { name: 'My Sessions', path: '/participant/sessions', icon: <Calendar className="h-5 w-5" /> },
          { name: 'Practice', path: '/participant/practice', icon: <MessageSquare className="h-5 w-5" /> },
        ];
      case 'evaluator':
        return [
          ...commonLinks,
          { name: 'Sessions to Evaluate', path: '/evaluator/sessions', icon: <Calendar className="h-5 w-5" /> },
          { name: 'Feedback History', path: '/evaluator/feedback', icon: <MessageSquare className="h-5 w-5" /> },
        ];
      default:
        return commonLinks;
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-speakspace-primary font-bold text-xl">SpeakSpace</span>
            </Link>
          </div>
          
          {isAuthenticated && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                      location.pathname === link.path
                        ? 'bg-gray-100 text-speakspace-primary font-medium'
                        : 'text-gray-600 hover:text-speakspace-primary hover:bg-gray-50'
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>

              {/* User Profile */}
              <div className="hidden md:flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 rounded-full overflow-hidden flex items-center space-x-2">
                      <img 
                        src={currentUser?.profileImage || `https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}`}
                        alt={currentUser?.name || 'User'}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-sm font-medium mr-1">{currentUser?.name}</span>
                      <div className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${getRoleColor(currentUser?.role || 'participant')} text-white`}>
                        {getRoleIcon(currentUser?.role || 'participant')}
                        <span className="ml-1 capitalize">{currentUser?.role}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className="flex items-center space-x-3">
              <Button asChild variant="ghost" className="text-gray-600">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild className="bg-speakspace-primary hover:bg-opacity-90">
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && isAuthenticated && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-20">
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                <img 
                  src={currentUser?.profileImage || `https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}`}
                  alt={currentUser?.name || 'User'}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className={`text-xs inline-flex px-2 py-0.5 rounded-full ${getRoleColor(currentUser?.role || 'participant')} text-white`}>
                    {currentUser?.role}
                  </p>
                </div>
              </div>
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      location.pathname === link.path
                        ? 'bg-gray-100 text-speakspace-primary font-medium'
                        : 'text-gray-600 hover:text-speakspace-primary hover:bg-gray-50'
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-gray-600 hover:text-speakspace-primary hover:bg-gray-50"
                  onClick={toggleMobileMenu}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-gray-600 hover:text-speakspace-primary hover:bg-gray-50"
                  onClick={toggleMobileMenu}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © 2025 SpeakSpace. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-speakspace-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-speakspace-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-speakspace-primary transition-colors">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
