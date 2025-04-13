
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Filter, Star, Mail, UserPlus, UserMinus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

// Mock participant data
const mockParticipants = [
  {
    id: '1',
    name: 'Jane Participant',
    email: 'jane@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff',
    sessionsAttended: 12,
    averageRating: 85,
    status: 'active'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=10B981&color=fff',
    sessionsAttended: 8,
    averageRating: 78,
    status: 'active'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff',
    sessionsAttended: 6,
    averageRating: 82,
    status: 'active'
  },
  {
    id: '4',
    name: 'Mike Brown',
    email: 'mike@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Brown&background=10B981&color=fff',
    sessionsAttended: 4,
    averageRating: 75,
    status: 'active'
  },
  {
    id: '5',
    name: 'Alex Evaluator',
    email: 'alex@example.com',
    role: 'evaluator',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Evaluator&background=F59E0B&color=fff',
    sessionsAttended: 15,
    averageRating: 90,
    status: 'active'
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=10B981&color=fff',
    sessionsAttended: 3,
    averageRating: 70,
    status: 'inactive'
  },
  {
    id: '7',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=10B981&color=fff',
    sessionsAttended: 7,
    averageRating: 80,
    status: 'active'
  },
];

const ManageParticipants = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('participant');

  // Filter participants based on search and filters
  const filteredParticipants = mockParticipants.filter(participant => {
    const matchesSearch = 
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || participant.role === roleFilter;
    
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInviteDialog(false);
  };

  const handleRemoveParticipant = (id: string, name: string) => {
    // In a real app, this would call an API to remove the participant
    toast.success(`${name} has been removed`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manage Participants</h1>
            <p className="text-gray-500">Invite and manage participants and evaluators</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button className="btn-moderator">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Users
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite New Users</DialogTitle>
                  <DialogDescription>
                    Send an invitation email to add new participants or evaluators.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInviteSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participant">Participant</SelectItem>
                        <SelectItem value="evaluator">Evaluator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowInviteDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-moderator">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search participants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="participant">Participants</SelectItem>
              <SelectItem value="evaluator">Evaluators</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Participants & Evaluators</CardTitle>
            <CardDescription>
              {filteredParticipants.length} users found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Avg. Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-gray-500">{participant.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          participant.role === 'evaluator'
                            ? 'bg-speakspace-evaluator/10 text-speakspace-evaluator border-speakspace-evaluator/30'
                            : 'bg-speakspace-participant/10 text-speakspace-participant border-speakspace-participant/30'
                        }
                      >
                        {participant.role === 'evaluator' ? 'Evaluator' : 'Participant'}
                      </Badge>
                    </TableCell>
                    <TableCell>{participant.sessionsAttended}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{participant.averageRating}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          participant.status === 'active'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-gray-100 text-gray-800 border-gray-300'
                        }
                      >
                        {participant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/moderator/participants/${participant.id}/edit`)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleRemoveParticipant(participant.id, participant.name)}
                        >
                          <UserMinus className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Remove</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredParticipants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="rounded-full bg-gray-100 p-3">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ManageParticipants;
