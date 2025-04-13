
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Bell, Globe, Moon, Shield, Volume2 } from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const Settings = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { 
      id: 'session-reminders', 
      title: 'Session Reminders', 
      description: 'Receive notifications before your scheduled sessions',
      enabled: true 
    },
    { 
      id: 'feedback-alerts', 
      title: 'Feedback Alerts', 
      description: 'Get notified when you receive new feedback',
      enabled: true 
    },
    { 
      id: 'system-updates', 
      title: 'System Updates', 
      description: 'Stay informed about platform changes and updates',
      enabled: false 
    },
  ]);

  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: 'profile-visibility',
      title: 'Profile Visibility',
      description: 'Allow others to see your profile information',
      enabled: true
    },
    {
      id: 'session-history',
      title: 'Session History',
      description: 'Make your past sessions visible to evaluators',
      enabled: true
    },
  ]);

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [volume, setVolume] = useState(80);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
    toast.success(`Notification setting updated`);
  };

  const togglePrivacy = (id: string) => {
    setPrivacySettings(privacySettings.map(setting => 
      setting.id === id 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
    toast.success(`Privacy setting updated`);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    toast.success(`Language changed to ${e.target.value}`);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.success(`Theme changed to ${!darkMode ? 'dark' : 'light'} mode`);
  };

  return (
    <MainLayout requireAuth={true}>
      <div className="container max-w-4xl animate-fade-in py-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="account" className="text-base">Account</TabsTrigger>
            <TabsTrigger value="notifications" className="text-base">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="text-base">Privacy</TabsTrigger>
            <TabsTrigger value="appearance" className="text-base">Appearance</TabsTrigger>
          </TabsList>
          
          {/* Account Settings */}
          <TabsContent value="account" className="animate-fade-in">
            <Card className="hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={currentUser?.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={currentUser?.email} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={currentUser?.role} readOnly className="capitalize" />
                </div>
                <div className="pt-4">
                  <Button variant="outline" onClick={() => toast.success("Password reset email sent")}>
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="animate-fade-in">
            <Card className="hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Control which notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <Switch 
                      checked={notification.enabled}
                      onCheckedChange={() => toggleNotification(notification.id)}
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => toast.success("All notifications have been reset")}>
                  Reset to Default
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Privacy Settings */}
          <TabsContent value="privacy" className="animate-fade-in">
            <Card className="hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Privacy Settings</span>
                </CardTitle>
                <CardDescription>Manage your privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {privacySettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{setting.title}</h4>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <Switch 
                      checked={setting.enabled}
                      onCheckedChange={() => togglePrivacy(setting.id)}
                    />
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h4 className="font-medium">Data & Privacy</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Your data has been requested")}>
                      Request My Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="animate-fade-in">
            <Card className="hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how SpeakSpace looks for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark Mode</span>
                    </h4>
                    <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Language</span>
                  </h4>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <span>Sound Volume</span>
                  </h4>
                  <div className="flex items-center gap-3">
                    <Input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full"
                    />
                    <span className="w-10 text-right">{volume}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => toast.success("Appearance settings reset to default")}>
                  Reset to Default
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
