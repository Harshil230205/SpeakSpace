
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  Edit,
  PlayCircle,
  PlusCircle,
  Search,
  Trash2,
  Users,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";

// Mock session data
const mockSessions = [
  {
    id: '1',
    title: 'Corporate Leadership Strategies',
    description: 'Discussion about effective leadership techniques in corporate environments',
    date: '2025-04-15T14:00:00',
    duration: 60,
    participants: [
      { id: '1', name: 'Jane Participant', role: 'participant' },
      { id: '2', name: 'John Smith', role: 'participant' },
      { id: '3', name: 'Sarah Johnson', role: 'participant' },
      { id: '4', name: 'Mike Brown', role: 'participant' },
      { id: '5', name: 'Alex Evaluator', role: 'evaluator' },
    ],
    status: 'scheduled',
    createdAt: '2025-04-01T10:00:00'
  },
  {
    id: '2',
    title: 'Technical Interview Preparation',
    description: 'Mock technical interviews for software engineering positions',
    date: '2025-04-18T10:00:00',
    duration: 45,
    participants: [
      { id: '1', name: 'Jane Participant', role: 'participant' },
      { id: '6', name: 'Emily Davis', role: 'participant' },
      { id: '7', name: 'David Wilson', role: 'participant' },
      { id: '5', name: 'Alex Evaluator', role: 'evaluator' },
    ],
    status: 'scheduled',
    createdAt: '2025-04-03T14:30:00'
  },
  {
    id: '3',
    title: 'Product Management Discussion',
    description: 'Strategies for effective product management and roadmap planning',
    date: '2025-04-20T16:30:00',
    duration: 90,
    participants: [
      { id: '1', name: 'Jane Participant', role: 'participant' },
      { id: '8', name: 'Lisa Johnson', role: 'participant' },
      { id: '9', name: 'Robert Chen', role: 'participant' },
      { id: '10', name: 'Kevin Williams', role: 'participant' },
      { id: '5', name: 'Alex Evaluator', role: 'evaluator' },
    ],
    status: 'scheduled',
    createdAt: '2025-04-05T09:15:00'
  },
  {
    id: '4',
    title: 'Marketing Campaign Analysis',
    description: 'Review and discussion of recent marketing campaigns',
    date: '2025-04-10T11:00:00',
    duration: 60,
    participants: [
      { id: '1', name: 'Jane Participant', role: 'participant' },
      { id: '11', name: 'Thomas Harris', role: 'participant' },
      { id: '12', name: 'Amanda Lee', role: 'participant' },
      { id: '5', name: 'Alex Evaluator', role: 'evaluator' },
    ],
    status: 'completed',
    createdAt: '2025-03-28T16:45:00'
  },
  {
    id: '5',
    title: 'Financial Analysis Group Discussion',
    description: 'Case study analysis of financial statements and investment strategies',
    date: '2025-04-08T15:30:00',
    duration: 75,
    participants: [
      { id: '1', name: 'Jane Participant', role: 'participant' },
      { id: '13', name: 'Richard Taylor', role: 'participant' },
      { id: '14', name: 'Olivia Martinez', role: 'participant' },
      { id: '15', name: 'Sophia Clark', role: 'participant' },
      { id: '5', name: 'Alex Evaluator', role: 'evaluator' },
    ],
    status: 'completed',
    createdAt: '2025-03-25T10:20:00'
  }
];

const ModeratorSessions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and sort sessions
  const filteredSessions = mockSessions.filter(session => {
    // Filter by search query
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          session.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // Sort by selected field
    let comparison = 0;
    if (sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'participants') {
      comparison = a.participants.length - b.participants.length;
    } else if (sortBy === 'duration') {
      comparison = a.duration - b.duration;
    }
    
    // Apply sort order
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const upcomingSessions = filteredSessions.filter(session => session.status === 'scheduled');
  const completedSessions = filteredSessions.filter(session => session.status === 'completed');

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDeleteSession = (sessionId: string) => {
    toast.success("Session deleted successfully");
    // In a real app, this would call an API to delete the session
  };

  const handleStartSession = (sessionId: string) => {
    navigate(`/moderator/sessions/${sessionId}/room`);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manage Sessions</h1>
            <p className="text-gray-500">Create and manage your group discussion and interview sessions</p>
          </div>
          <Button 
            onClick={() => navigate('/moderator/sessions/create')}
            className="btn-moderator"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Session
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search sessions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              <SelectItem value="scheduled">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="participants">Participants</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={toggleSortOrder} className="w-full md:w-auto">
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="completed">Completed Sessions</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingSessions.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.title}</TableCell>
                        <TableCell>{formatDate(session.date)}</TableCell>
                        <TableCell>{session.duration} min</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {session.participants.length}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/moderator/sessions/${session.id}/edit`)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStartSession(session.id)}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <PlayCircle className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Start</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteSession(session.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3 py-12 border rounded-md">
                <Calendar className="h-12 w-12 text-gray-400" />
                <div className="text-center space-y-1">
                  <p className="text-lg font-medium">No upcoming sessions</p>
                  <p className="text-gray-500">Create a new session to get started</p>
                </div>
                <Button 
                  onClick={() => navigate('/moderator/sessions/create')}
                  className="mt-2 btn-moderator"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Session
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedSessions.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.title}</TableCell>
                        <TableCell>{formatDate(session.date)}</TableCell>
                        <TableCell>{session.duration} min</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {session.participants.length}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/moderator/sessions/${session.id}/summary`)}
                          >
                            View Summary
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3 py-12 border rounded-md">
                <Calendar className="h-12 w-12 text-gray-400" />
                <div className="text-center space-y-1">
                  <p className="text-lg font-medium">No completed sessions</p>
                  <p className="text-gray-500">Your completed sessions will appear here</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ModeratorSessions;
