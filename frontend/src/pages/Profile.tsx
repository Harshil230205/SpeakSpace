
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { User, UserRole } from '@/contexts/AuthContext';
import { Calendar, Mail, UserRound } from 'lucide-react';

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
      return <Calendar className="h-5 w-5" />;
    case 'participant':
      return <UserRound className="h-5 w-5" />;
    case 'evaluator':
      return <Mail className="h-5 w-5" />;
    default:
      return null;
  }
};

const Profile = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>(
    currentUser ? {
      name: currentUser.name,
      email: currentUser.email,
      profileImage: currentUser.profileImage,
    } : {}
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would update the user in the database here
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <MainLayout requireAuth={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Not Authenticated</h2>
                <p className="mt-2 text-gray-500">Please log in to view your profile.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout requireAuth={true}>
      <div className="container max-w-4xl animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile" className="text-base">Profile Information</TabsTrigger>
            <TabsTrigger value="preferences" className="text-base">Preferences & Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Profile Image Section */}
              <Card className="col-span-2 hover-scale transition-all duration-300">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Profile Picture</h3>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={currentUser.profileImage} alt={currentUser.name} />
                    <AvatarFallback className="text-2xl">
                      {currentUser.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${getRoleColor(currentUser.role)} text-white text-sm mt-2`}>
                    {getRoleIcon(currentUser.role)}
                    <span className="ml-1 capitalize">{currentUser.role}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center pb-6">
                  <Button variant="outline" className="w-full" disabled>
                    Change Picture
                  </Button>
                </CardFooter>
              </Card>

              {/* Profile Details */}
              <Card className="col-span-3 hover-scale transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Personal Information</h3>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <div className="flex items-center p-2 border rounded-md bg-gray-50">
                            <UserRound className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{currentUser.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                          />
                        ) : (
                          <div className="flex items-center p-2 border rounded-md bg-gray-50">
                            <Mail className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{currentUser.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                          {getRoleIcon(currentUser.role)}
                          <span className="capitalize">{currentUser.role}</span>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-2 mt-4">
                          <Button type="submit" className="w-full">Save Changes</Button>
                          <Button type="button" variant="outline" className="w-full" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="animate-fade-in">
            <Card className="hover-scale transition-all duration-300">
              <CardHeader>
                <h3 className="text-xl font-semibold">User Preferences</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-500">Preferences settings will be available in a future update.</p>
                <div className="h-32 flex items-center justify-center bg-gray-50 rounded-md border border-dashed">
                  <p className="text-gray-400">Preferences panel coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
