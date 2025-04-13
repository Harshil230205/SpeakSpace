
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Save, Trash2, UserCog } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock participant data
const mockParticipantData = {
  id: '123',
  name: 'Jane Participant',
  email: 'jane@example.com',
  profileImage: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff',
  role: 'participant',
  status: 'active',
  tags: ['English', 'Beginner', 'Remote'],
  joinDate: '2025-01-15',
  bio: 'I am learning to improve my public speaking skills, particularly for professional presentations.',
  preferredLanguage: 'English',
  skillLevel: 'beginner',
  sessionPreference: 'remote',
  contactNumber: '+1234567890',
  isActive: true,
  assignedGroups: ['Group A', 'Presentation Skills'],
  notes: 'Shows great enthusiasm but needs to work on confidence.',
};

const EditParticipant = () => {
  const { participantId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [participant, setParticipant] = useState(mockParticipantData);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Simulate fetching participant data
  useEffect(() => {
    // In a real app, you would fetch the participant data using the ID
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [participantId]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParticipant(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setParticipant(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setParticipant(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Participant updated successfully');
      navigate('/moderator/participants');
    }, 1000);
  };
  
  const handleDelete = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Participant deleted successfully');
      navigate('/moderator/participants');
    }, 1000);
  };
  
  return (
    <MainLayout requireAuth={true}>
      <div className="container max-w-4xl py-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate('/moderator/participants')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Participants</span>
          </Button>
          <h1 className="text-2xl font-bold">Edit Participant</h1>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-xl">Loading participant data...</div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-4">
            {/* Profile Card */}
            <Card className="col-span-1 hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle>Profile Image</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={participant.profileImage} alt={participant.name} />
                  <AvatarFallback className="text-2xl">
                    {participant.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{participant.name}</h3>
                  <p className="text-gray-500 text-sm">{participant.email}</p>
                </div>
                <Button variant="outline" className="w-full">Change Image</Button>
              </CardContent>
            </Card>
            
            {/* Edit Form */}
            <Card className="col-span-3 hover-scale transition-all duration-300">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCog className="h-5 w-5" />
                    <span>Participant Information</span>
                  </CardTitle>
                  <CardDescription>Update participant details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={participant.name} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={participant.email} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <Input 
                        id="contactNumber" 
                        name="contactNumber" 
                        value={participant.contactNumber} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Join Date</Label>
                      <Input 
                        id="joinDate" 
                        name="joinDate" 
                        type="date" 
                        value={participant.joinDate} 
                        onChange={handleInputChange} 
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredLanguage">Preferred Language</Label>
                      <Select 
                        value={participant.preferredLanguage}
                        onValueChange={(value) => handleSelectChange('preferredLanguage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skillLevel">Skill Level</Label>
                      <Select 
                        value={participant.skillLevel}
                        onValueChange={(value) => handleSelectChange('skillLevel', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionPreference">Session Preference</Label>
                      <Select 
                        value={participant.sessionPreference}
                        onValueChange={(value) => handleSelectChange('sessionPreference', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="in-person">In-Person</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 flex items-center justify-between">
                      <div>
                        <Label htmlFor="isActive">Active Status</Label>
                        <p className="text-sm text-gray-500">Is this participant currently active?</p>
                      </div>
                      <Switch 
                        id="isActive"
                        checked={participant.isActive}
                        onCheckedChange={(checked) => handleSwitchChange('isActive', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      rows={3} 
                      value={participant.bio} 
                      onChange={handleInputChange}
                      placeholder="Enter participant's bio"
                    />
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="notes">Moderator Notes</Label>
                    <Textarea 
                      id="notes" 
                      name="notes" 
                      rows={3} 
                      value={participant.notes} 
                      onChange={handleInputChange}
                      placeholder="Add private notes about this participant"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" type="button">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Participant
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete the participant 
                          account and remove their data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button type="submit" className="bg-speakspace-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default EditParticipant;
