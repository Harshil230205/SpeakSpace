
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Calendar, Clock, FileCheck, MessageCircle, MessageSquare, Users } from 'lucide-react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

// Mock session data
const mockSessionData = {
  id: '123',
  title: 'Advanced Public Speaking Workshop',
  topic: 'Public Speaking',
  type: 'Workshop',
  description: 'This workshop focused on advanced techniques for public speaking, including voice modulation, audience engagement, and handling Q&A sessions effectively.',
  date: '2025-03-25T14:00:00',
  duration: 120,
  status: 'completed',
  participantCount: 8,
  moderator: {
    id: '1',
    name: 'John Moderator',
    image: 'https://ui-avatars.com/api/?name=John+Moderator&background=6366F1&color=fff'
  },
  evaluator: {
    id: '2',
    name: 'Emily Evaluator',
    image: 'https://ui-avatars.com/api/?name=Emily+Evaluator&background=8B5CF6&color=fff'
  },
  participants: [
    {
      id: '3',
      name: 'Jane Participant',
      image: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff',
      attendance: 'present',
      participationScore: 9,
      speakingTime: 12, // in minutes
      evaluationScore: 8.5,
      feedback: 'Excellent contributions with articulate speaking. Could work on brevity.'
    },
    {
      id: '4',
      name: 'Robert Smith',
      image: 'https://ui-avatars.com/api/?name=Robert+Smith&background=10B981&color=fff',
      attendance: 'present',
      participationScore: 7,
      speakingTime: 8,
      evaluationScore: 7.8,
      feedback: 'Good points but needs to work on confidence and voice projection.'
    },
    {
      id: '5',
      name: 'Maria Garcia',
      image: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=10B981&color=fff',
      attendance: 'late',
      participationScore: 8,
      speakingTime: 9,
      evaluationScore: 8.2,
      feedback: 'Strong narrative skills. Work on reducing filler words.'
    },
    {
      id: '6',
      name: 'James Johnson',
      image: 'https://ui-avatars.com/api/?name=James+Johnson&background=10B981&color=fff',
      attendance: 'present',
      participationScore: 6,
      speakingTime: 5,
      evaluationScore: 6.5,
      feedback: 'Limited participation. Needs to be more active in discussions.'
    },
    {
      id: '7',
      name: 'Sarah Brown',
      image: 'https://ui-avatars.com/api/?name=Sarah+Brown&background=10B981&color=fff',
      attendance: 'absent',
      participationScore: 0,
      speakingTime: 0,
      evaluationScore: 0,
      feedback: 'Did not attend the session.'
    },
    {
      id: '8',
      name: 'Michael Davis',
      image: 'https://ui-avatars.com/api/?name=Michael+Davis&background=10B981&color=fff',
      attendance: 'present',
      participationScore: 8,
      speakingTime: 10,
      evaluationScore: 7.9,
      feedback: 'Engaging and thoughtful. Could improve structure of arguments.'
    },
    {
      id: '9',
      name: 'Lisa Wilson',
      image: 'https://ui-avatars.com/api/?name=Lisa+Wilson&background=10B981&color=fff',
      attendance: 'present',
      participationScore: 9,
      speakingTime: 11,
      evaluationScore: 8.7,
      feedback: 'Excellent presence and articulation. Great listener too.'
    },
    {
      id: '10',
      name: 'David Martinez',
      image: 'https://ui-avatars.com/api/?name=David+Martinez&background=10B981&color=fff',
      attendance: 'present',
      participationScore: 7,
      speakingTime: 7,
      evaluationScore: 7.2,
      feedback: 'Good points but needs to be more concise and confident.'
    }
  ],
  discussionTopics: [
    {
      topic: 'Effective Opening Techniques',
      duration: 25,
      engagement: 'High',
      notes: 'Participants shared various techniques they use to open presentations effectively.'
    },
    {
      topic: 'Handling Difficult Questions',
      duration: 30,
      engagement: 'Very High',
      notes: 'This was the most engaged discussion, with many participants sharing personal experiences.'
    },
    {
      topic: 'Voice Modulation Exercises',
      duration: 20,
      engagement: 'Medium',
      notes: 'Some participants were hesitant to participate in the voice exercises.'
    },
    {
      topic: 'Closing with Impact',
      duration: 25,
      engagement: 'High',
      notes: 'Good discussion about memorable closing techniques and calls to action.'
    }
  ],
  overallSummary: 'The session was highly productive with engaged participants. Most participants showed improvement in their speaking skills compared to previous sessions. The voice modulation exercises need to be refined for future sessions.',
  nextSteps: 'Schedule individual feedback sessions with participants who scored below 7. Plan the next workshop focusing on storytelling techniques.'
};

const SessionSummary = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState(mockSessionData);
  
  // Simulate loading session data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [sessionId]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'late':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score === 0) return 'text-gray-400';
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <MainLayout requireAuth={true}>
      <div className="container max-w-6xl py-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate('/moderator/sessions')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sessions</span>
          </Button>
          <h1 className="text-2xl font-bold">Session Summary</h1>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-xl">Loading session data...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Session Overview Card */}
            <Card className="hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-speakspace-primary" />
                  <span>{sessionData.title}</span>
                </CardTitle>
                <CardDescription className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{formatDate(sessionData.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{sessionData.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{sessionData.participantCount} participants</span>
                  </div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg flex-1 min-w-[250px]">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Session Topic</h3>
                    <p className="font-medium">{sessionData.topic}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex-1 min-w-[250px]">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Session Type</h3>
                    <p className="font-medium">{sessionData.type}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex-1 min-w-[250px]">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Moderator</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={sessionData.moderator.image} />
                        <AvatarFallback>{sessionData.moderator.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{sessionData.moderator.name}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex-1 min-w-[250px]">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Evaluator</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={sessionData.evaluator.image} />
                        <AvatarFallback>{sessionData.evaluator.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{sessionData.evaluator.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Session Description</h3>
                  <p className="text-gray-700">{sessionData.description}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Tabs for different summary views */}
            <Tabs defaultValue="participants" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="participants" className="text-base">
                  <Users className="h-4 w-4 mr-2" />
                  Participants
                </TabsTrigger>
                <TabsTrigger value="topics" className="text-base">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discussion Topics
                </TabsTrigger>
                <TabsTrigger value="summary" className="text-base">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Overall Summary
                </TabsTrigger>
              </TabsList>
              
              {/* Participants Tab */}
              <TabsContent value="participants" className="animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Participant Performance</CardTitle>
                    <CardDescription>
                      Detailed overview of each participant's engagement and feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Participant</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Speaking Time</TableHead>
                          <TableHead>Participation</TableHead>
                          <TableHead>Evaluation</TableHead>
                          <TableHead>Feedback</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sessionData.participants.map((participant) => (
                          <TableRow key={participant.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={participant.image} />
                                  <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{participant.name}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getAttendanceStatusColor(participant.attendance)}`}>
                                {participant.attendance.charAt(0).toUpperCase() + participant.attendance.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              {participant.speakingTime > 0 ? `${participant.speakingTime} min` : '-'}
                            </TableCell>
                            <TableCell>
                              <span className={getScoreColor(participant.participationScore)}>
                                {participant.participationScore > 0 ? participant.participationScore.toFixed(1) : '-'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={getScoreColor(participant.evaluationScore)}>
                                {participant.evaluationScore > 0 ? participant.evaluationScore.toFixed(1) : '-'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Drawer>
                                <DrawerTrigger asChild>
                                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    <span>View</span>
                                  </Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                  <DrawerHeader className="text-left">
                                    <DrawerTitle>Feedback for {participant.name}</DrawerTitle>
                                    <DrawerDescription>Evaluator comments and feedback</DrawerDescription>
                                  </DrawerHeader>
                                  <div className="p-4 pt-0">
                                    <div className="flex items-center gap-3 mb-3">
                                      <Avatar className="h-10 w-10">
                                        <AvatarImage src={participant.image} />
                                        <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{participant.name}</p>
                                        <div className="text-sm text-gray-500">
                                          Evaluation Score: <span className={getScoreColor(participant.evaluationScore)}>
                                            {participant.evaluationScore > 0 ? participant.evaluationScore.toFixed(1) : '-'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <Card className="mb-4">
                                      <CardContent className="p-4">
                                        <p className="text-gray-700">{participant.feedback}</p>
                                      </CardContent>
                                    </Card>
                                    
                                    <h4 className="font-medium mb-2">Performance Metrics</h4>
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <div className="text-sm text-gray-500">Speaking Time</div>
                                        <div className="font-medium">{participant.speakingTime} min</div>
                                      </div>
                                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <div className="text-sm text-gray-500">Participation</div>
                                        <div className={`font-medium ${getScoreColor(participant.participationScore)}`}>
                                          {participant.participationScore > 0 ? participant.participationScore.toFixed(1) : '-'}
                                        </div>
                                      </div>
                                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <div className="text-sm text-gray-500">Attendance</div>
                                        <div className="font-medium capitalize">{participant.attendance}</div>
                                      </div>
                                    </div>
                                    
                                    <Button className="w-full">Send Feedback to Participant</Button>
                                  </div>
                                </DrawerContent>
                              </Drawer>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Discussion Topics Tab */}
              <TabsContent value="topics" className="animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion Topics</CardTitle>
                    <CardDescription>
                      Breakdown of topics covered during the session
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sessionData.discussionTopics.map((topic, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="mb-3 md:mb-0">
                                <h3 className="text-lg font-medium">{topic.topic}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{topic.duration} minutes</span>
                                  </div>
                                  <div>
                                    Engagement: <span className="font-medium">{topic.engagement}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 p-3 bg-gray-50 rounded-md">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                              <p className="text-gray-700">{topic.notes}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Overall Summary Tab */}
              <TabsContent value="summary" className="animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Session Summary</CardTitle>
                    <CardDescription>
                      Complete analysis and next steps
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Session Summary</h3>
                      <p className="text-gray-700">{sessionData.overallSummary}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Next Steps</h3>
                      <p className="text-gray-700">{sessionData.nextSteps}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Average Participation</h3>
                          <div className="text-2xl font-bold text-speakspace-primary">
                            {(sessionData.participants
                              .map(p => p.participationScore)
                              .reduce((sum, score) => sum + score, 0) / 
                              sessionData.participants.filter(p => p.participationScore > 0).length).toFixed(1)}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Average Evaluation</h3>
                          <div className="text-2xl font-bold text-speakspace-primary">
                            {(sessionData.participants
                              .map(p => p.evaluationScore)
                              .reduce((sum, score) => sum + score, 0) / 
                              sessionData.participants.filter(p => p.evaluationScore > 0).length).toFixed(1)}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Attendance Rate</h3>
                          <div className="text-2xl font-bold text-speakspace-primary">
                            {Math.round((sessionData.participants.filter(p => p.attendance !== 'absent').length / 
                              sessionData.participants.length) * 100)}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button className="bg-speakspace-primary">
                        Download Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SessionSummary;
