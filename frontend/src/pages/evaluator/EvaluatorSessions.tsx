
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, Users, ExternalLink, Search } from 'lucide-react';

// Mock sessions data
const mockSessions = [
  {
    id: '1',
    title: 'Marketing Strategy Discussion',
    topic: 'Digital Marketing',
    type: 'Group Discussion',
    status: 'Upcoming',
    date: '2025-04-15T14:00:00',
    duration: 60,
    participantCount: 6,
    moderator: {
      name: 'John Moderator',
      id: '1'
    }
  },
  {
    id: '2',
    title: 'Technical Interview Practice',
    topic: 'Software Engineering',
    type: 'Interview',
    status: 'Upcoming',
    date: '2025-04-16T10:00:00',
    duration: 45,
    participantCount: 1,
    moderator: {
      name: 'John Moderator',
      id: '1'
    }
  },
  {
    id: '3',
    title: 'Leadership Skills Assessment',
    topic: 'Management',
    type: 'Group Discussion',
    status: 'Completed',
    date: '2025-04-10T15:00:00',
    duration: 90,
    participantCount: 5,
    moderator: {
      name: 'John Moderator',
      id: '1'
    }
  },
  {
    id: '4',
    title: 'Product Management Case Study',
    topic: 'Product Development',
    type: 'Group Discussion',
    status: 'Completed',
    date: '2025-04-09T11:00:00',
    duration: 75,
    participantCount: 4,
    moderator: {
      name: 'John Moderator',
      id: '1'
    }
  }
];

const EvaluatorSessions = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSessions, setFilteredSessions] = useState(mockSessions);
  
  // In a real app, this would fetch sessions data from a backend API
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredSessions(mockSessions);
    } else {
      const filtered = mockSessions.filter(session => 
        session.title.toLowerCase().includes(term.toLowerCase()) || 
        session.topic.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSessions(filtered);
    }
  };
  
  const enterSession = (sessionId: string) => {
    navigate(`/evaluator/sessions/${sessionId}/room`);
  };
  
  const viewFeedback = (sessionId: string) => {
    navigate(`/evaluator/sessions/${sessionId}/feedback-history`);
  };
  
  if (!currentUser || currentUser.role !== 'evaluator') {
    return (
      <MainLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You need to be logged in as an evaluator to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={() => navigate('/login')}>
                Log in as Evaluator
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sessions to Evaluate</h1>
            <p className="text-muted-foreground">
              Review and provide feedback on discussion and interview sessions
            </p>
          </div>
          
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search sessions..."
              className="pl-8 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Sessions scheduled for evaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Participants</TableHead>
                    <TableHead className="hidden lg:table-cell">Moderator</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions
                    .filter(session => session.status === 'Upcoming')
                    .map(session => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="font-medium">{session.title}</div>
                          <div className="text-xs text-muted-foreground">
                            Topic: {session.topic}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{formatDate(session.date)}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{session.duration} minutes</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{session.type}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>{session.participantCount}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {session.moderator.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => enterSession(session.id)}>
                            Enter
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredSessions.filter(session => session.status === 'Upcoming').length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No upcoming sessions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>
                Previously evaluated sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Participants</TableHead>
                    <TableHead className="hidden lg:table-cell">Moderator</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions
                    .filter(session => session.status === 'Completed')
                    .map(session => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="font-medium">{session.title}</div>
                          <div className="text-xs text-muted-foreground">
                            Topic: {session.topic}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{formatDate(session.date)}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{session.duration} minutes</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{session.type}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span>{session.participantCount}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {session.moderator.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => viewFeedback(session.id)}
                          >
                            View Feedback
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredSessions.filter(session => session.status === 'Completed').length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No past sessions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EvaluatorSessions;
