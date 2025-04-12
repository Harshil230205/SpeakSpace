
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Calendar, BarChart3, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { currentUser } from '@/utils/mockData';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <User className="h-5 w-5 mr-2" />
    },
    {
      name: 'Sessions',
      path: '/sessions',
      icon: <Calendar className="h-5 w-5 mr-2" />
    },
    {
      name: 'Discussion',
      path: '/discussion',
      icon: <MessageSquare className="h-5 w-5 mr-2" />
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: <BarChart3 className="h-5 w-5 mr-2" />
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b shadow-sm py-3 px-4 fixed w-full top-0 z-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center mr-2">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">SpeakSpace</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'text-primary bg-primary/10 font-medium'
                  : 'text-gray-600 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center">
            <span className="text-sm text-gray-700 mr-2">{currentUser?.name}</span>
            <Avatar>
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback>{currentUser?.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[300px] px-0">
              <div className="flex flex-col h-full">
                <div className="px-4 py-6 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                      <AvatarFallback>{currentUser?.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{currentUser?.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{currentUser?.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col py-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-4 py-3 ${
                        isActive(item.path)
                          ? 'text-primary bg-primary/10 font-medium'
                          : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="mt-auto border-t px-4 py-4">
                  <Link to="/">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
