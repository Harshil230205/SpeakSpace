
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  Clock,
  MessageSquare,
  Users,
  User,
  ArrowLeft,
  Activity,
  Star,
  Send,
  Clipboard,
  CheckCircle
} from 'lucide-react';
import { toast } from "sonner";

// Mock session data
const mockSession = {
  id: '1',
  title: 'Marketing Strategy Discussion',
  topic: 'Digital Marketing',
  type: 'Group Discussion',
  status: 'Active',
  date: '2025-04-15T14:00:00',
  duration: 60,
  description: 'This session will focus on developing effective digital marketing strategies for a small business. Participants will discuss various channels, budget allocation, and measurement techniques.',
  moderator: {
    id: '1',
    name: 'John Moderator',
    profileImage: 'https://ui-avatars.com/api/?name=John+Moderator&background=4F46E5&color=fff'
  },
  participants: [
    {
      id: '2',
      name: 'Jane Participant',
      profileImage: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff',
      isActive: true,
      speakingTime: 186,
      contributions: 8
    },
    {
      id: '5',
      name: 'Michael Smith',
      profileImage: 'https://ui-avatars.com/api/?name=Michael+Smith&background=10B981&color=fff',
      isActive: true,
      speakingTime: 143,
      contributions: 7
    },
    {
      id: '6',
      name: 'Sarah Johnson',
      profileImage: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff',
      isActive: true,
      speakingTime: 119,
      contributions: 4
    },
    {
      id: '7',
      name: 'David Brown',
      profileImage: 'https://ui-avatars.com/api/?name=David+Brown&background=10B981&color=fff',
      isActive: false,
      speakingTime: 52,
      contributions: 2
    }
  ],
  messages: [
    {
      id: '1',
      sender: {
        id: '1',
        name: 'John Moderator',
        role: 'moderator',
        profileImage: 'https://ui-avatars.com/api/?name=John+Moderator&background=4F46E5&color=fff'
      },
      content: "Welcome everyone to today's discussion on digital marketing strategies. Let's start by sharing our thoughts on the most effective channels for small businesses.",
      timestamp: '2025-04-15T14:01:20'
    },
    {
      id: '2',
      sender: {
        id: '2',
        name: 'Jane Participant',
        role: 'participant',
        profileImage: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff'
      },
      content: "I believe social media marketing is the most cost-effective for small businesses. It allows for precise targeting and doesn't require a huge budget to get started.",
      timestamp: '2025-04-15T14:02:35'
    },
    {
      id: '3',
      sender: {
        id: '5',
        name: 'Michael Smith',
        role: 'participant',
        profileImage: 'https://ui-avatars.com/api/?name=Michael+Smith&background=10B981&color=fff'
      },
      content: "While social media is important, I'd argue that email marketing still has the highest ROI for small businesses. It's direct and allows for personalization.",
      timestamp: '2025-04-15T14:03:10'
    },
    {
      id: '4',
      sender: {
        id: '6',
        name: 'Sarah Johnson',
        role: 'participant',
        profileImage: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff'
      },
      content: "I agree with both points, but I think it's important to consider the specific industry. For some B2B businesses, LinkedIn might be more valuable than Instagram or TikTok.",
      timestamp: '2025-04-15T14:04:45'
    },
    {
      id: '5',
      sender: {
        id: '2',
        name: 'Jane Participant',
        role: 'participant',
        profileImage: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff'
      },
      content: "That's a good point, Sarah. Industry-specific strategies are crucial. However, I would add that regardless of the industry, content marketing across various channels can be effective if done consistently.",
      timestamp: '2025-04-15T14:06:15'
    }
  ]
};

const EvaluationRoom = () => {
  const { sessionId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [session, setSession] = useState(mockSession);
  const [notes, setNotes] = useState('');
  const [participantRatings, setParticipantRatings] = useState<Record<string, Record<string, number>>>({});
  
  // In a real app, this would fetch session data from an API
  useEffect(() => {
    // Initialize participant ratings
    const initialRatings: Record<string, Record<string, number>> = {};
    mockSession.participants.forEach(participant => {
      initialRatings[participant.id] = {
        communication: 0,
        confidence: 0,
        reasoning: 0,
        engagement: 0
      };
    });
    setParticipantRatings(initialRatings);
    
    console.log(`Evaluation room loaded for session ${sessionId}`);
  }, [sessionId]);
  
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
  
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const handleRatingChange = (participantId: string, category: string, value: number) => {
    setParticipantRatings(prev => ({
      ...prev,
      [participantId]: {
        ...prev[participantId],
        [category]: value
      }
    }));
  };
  
  const submitFeedback = (participantId: string) => {
    // In a real app, this would submit feedback to a backend API
    console.log(`Submitting feedback for participant ${participantId}`, participantRatings[participantId]);
    toast.success(`Feedback submitted for ${session.participants.find(p => p.id === participantId)?.name}`);
  };
  
  const submitAllFeedback = () => {
    // In a real app, this would submit all feedback to a backend API
    console.log('Submitting all feedback', participantRatings, notes);
    toast.success('All feedback submitted successfully');
    navigate('/evaluator/sessions');
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
          <Button variant="ghost" size="sm" onClick={() => navigate('/evaluator/sessions')} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sessions</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    {session.title}
                    <Badge variant="outline" className="ml-2">{session.type}</Badge>
                  </div>
                </CardTitle>
                <CardDescription>{session.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{session.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>Topic: {session.topic}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Moderator: {session.moderator.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{session.participants.length} Participants</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Discussion History</h3>
                  <div className="rounded-md border h-[400px] overflow-y-auto p-4 space-y-4">
                    {session.messages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                          <img 
                            src={message.sender.profileImage} 
                            alt={message.sender.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{message.sender.name}</span>
                            <Badge variant="outline" className={`text-xs ${
                              message.sender.role === 'moderator' 
                                ? 'bg-speakspace-moderator text-white' 
                                : 'bg-speakspace-participant text-white'
                            }`}>
                              {message.sender.role === 'moderator' ? 'Moderator' : 'Participant'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Evaluation Notes</CardTitle>
                <CardDescription>
                  Add general notes about the overall session that will help with your evaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your notes about the session, group dynamics, and overall performance..."
                  className="min-h-[120px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Clipboard className="h-4 w-4" />
                  Save Notes
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  Participant Activity
                </CardTitle>
                <CardDescription>
                  Real-time activity metrics for each participant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {session.participants.map((participant) => (
                  <div key={participant.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <img 
                            src={participant.profileImage} 
                            alt={participant.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          {participant.isActive && (
                            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{participant.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {participant.isActive ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between rounded-md border p-2">
                        <span className="text-muted-foreground">Speaking Time:</span>
                        <span className="font-medium">{formatDuration(participant.speakingTime)}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-2">
                        <span className="text-muted-foreground">Contributions:</span>
                        <span className="font-medium">{participant.contributions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Participant Evaluation
                </CardTitle>
                <CardDescription>
                  Rate each participant's performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {session.participants.map((participant) => (
                  <div key={participant.id} className="space-y-3 pb-4 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                        <img 
                          src={participant.profileImage} 
                          alt={participant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{participant.name}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {['communication', 'confidence', 'reasoning', 'engagement'].map((category) => (
                        <div key={category} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs capitalize">{category}</label>
                            <span className="text-xs font-medium">
                              {participantRatings[participant.id]?.[category] || 0}/10
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 10 }, (_, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleRatingChange(participant.id, category, i + 1)}
                                className={`h-4 w-4 rounded-full ${
                                  (participantRatings[participant.id]?.[category] || 0) >= i + 1
                                    ? 'bg-speakspace-primary'
                                    : 'bg-muted'
                                }`}
                                aria-label={`Rate ${i + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => submitFeedback(participant.id)}
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Submit Feedback
                    </Button>
                  </div>
                ))}
                
                <Button 
                  className="w-full"
                  onClick={submitAllFeedback}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Finalize All Evaluations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EvaluationRoom;
