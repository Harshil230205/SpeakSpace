
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for sessions
const availableSessions = [
  {
    id: '1',
    title: 'Group Discussion: Climate Change Solutions',
    description: 'Discussing practical approaches to combat climate change on an individual and societal level.',
    date: '2025-04-25T14:00:00',
    duration: 60,
    topic: 'Environmental Issues',
    type: 'Group Discussion',
    participants: 8,
    maxParticipants: 10,
    moderator: {
      name: 'John Moderator',
      id: '1'
    },
    status: 'upcoming',
    isJoined: false
  },
  {
    id: '2',
    title: 'Mock Interview: Tech Startups',
    description: 'Practice interview for tech startup positions focusing on problem-solving and culture fit.',
    date: '2025-04-26T10:00:00',
    duration: 45,
    topic: 'Career Development',
    type: 'Mock Interview',
    participants: 5,
    maxParticipants: 6,
    moderator: {
      name: 'John Moderator',
      id: '1'
    },
    status: 'upcoming',
    isJoined: true
  },
  {
    id: '3',
    title: 'Debate: Artificial Intelligence Ethics',
    description: 'Ethical considerations and implications of AI advancement in society.',
    date: '2025-04-27T16:00:00',
    duration: 75,
    topic: 'Technology Ethics',
    type: 'Debate',
    participants: 6,
    maxParticipants: 8,
    moderator: {
      name: 'John Moderator',
      id: '1'
    },
    status: 'upcoming',
    isJoined: false
  }
];

const pastSessions = [
  {
    id: '4',
    title: 'Leadership Skills Workshop',
    description: 'Exploring effective leadership styles and communication techniques.',
    date: '2025-04-10T15:00:00',
    duration: 90,
    topic: 'Leadership',
    type: 'Workshop',
    participants: 12,
    maxParticipants: 15,
    moderator: {
      name: 'John Moderator',
      id: '1'
    },
    status: 'completed',
    performance: {
      communication: 8.5,
      confidence: 7.8,
      reasoning: 8.2,
      engagement: 9.0
    }
  },
  {
    id: '5',
    title: 'Problem-Solving Case Study',
    description: 'Analyzing and solving a business case with multiple stakeholders.',
    date: '2025-04-05T11:00:00',
    duration: 60,
    topic: 'Problem Solving',
    type: 'Case Study',
    participants: 8,
    maxParticipants: 8,
    moderator: {
      name: 'John Moderator',
      id: '1'
    },
    status: 'completed',
    performance: {
      communication: 7.5,
      confidence: 8.2,
      reasoning: 9.0,
      engagement: 8.4
    }
  }
];

const ParticipantSessions = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

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

  const handleJoinSession = (sessionId: string) => {
    // In a real app, this would make an API call to join the session
    navigate(`/participant/sessions/${sessionId}/room`);
  };

  const handleViewFeedback = (sessionId: string) => {
    navigate(`/participant/sessions/${sessionId}/feedback`);
  };

  if (!currentUser || currentUser.role !== 'participant') {
    return (
      <MainLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You need to be logged in as a participant to access this page.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/login')} className="w-full">
                Log in as Participant
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">My Sessions</h1>
          <p className="text-muted-foreground">
            View and join available sessions or review your past sessions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {availableSessions.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No upcoming sessions available</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{session.title}</CardTitle>
                        <Badge variant={session.isJoined ? "secondary" : "default"}>
                          {session.isJoined ? "Joined" : "Available"}
                        </Badge>
                      </div>
                      <CardDescription>{session.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="mb-3 text-sm line-clamp-2">{session.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{session.duration} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{session.participants}/{session.maxParticipants} participants</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Topic: {session.topic}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        onClick={() => handleJoinSession(session.id)} 
                        className="w-full"
                        variant={session.isJoined ? "secondary" : "default"}
                      >
                        {session.isJoined ? "Enter Session" : "Join Session"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastSessions.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No past sessions available</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pastSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{session.title}</CardTitle>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <CardDescription>{session.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="mb-3 text-sm line-clamp-2">{session.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{session.duration} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Topic: {session.topic}</span>
                        </div>
                      </div>
                      
                      {session.performance && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium mb-2">Your Performance</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Communication:</span>
                              <div className="font-medium">{session.performance.communication}/10</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Confidence:</span>
                              <div className="font-medium">{session.performance.confidence}/10</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Reasoning:</span>
                              <div className="font-medium">{session.performance.reasoning}/10</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Engagement:</span>
                              <div className="font-medium">{session.performance.engagement}/10</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        onClick={() => handleViewFeedback(session.id)} 
                        className="w-full"
                        variant="outline"
                      >
                        View Detailed Feedback
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ParticipantSessions;
