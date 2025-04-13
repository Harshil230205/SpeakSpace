import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, SendHorizontal, Mic, MicOff, Hand, Users, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

// Mock session data
const mockSession = {
  id: '1',
  title: 'Group Discussion: Climate Change Solutions',
  description: 'Discussing practical approaches to combat climate change on an individual and societal level.',
  date: '2025-04-25T14:00:00',
  duration: 60,
  topic: 'Environmental Issues',
  type: 'Group Discussion',
  moderator: {
    name: 'John Moderator',
    id: '1',
    profileImage: 'https://ui-avatars.com/api/?name=John+Moderator&background=4F46E5&color=fff'
  },
  status: 'active',
  participants: [
    {
      id: '2',
      name: 'Jane Participant',
      role: 'participant',
      isActive: false,
      isSpeaking: false,
      hasRaisedHand: false,
      profileImage: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff'
    },
    {
      id: '3',
      name: 'Mark Anderson',
      role: 'participant',
      isActive: true,
      isSpeaking: true,
      hasRaisedHand: false,
      profileImage: 'https://ui-avatars.com/api/?name=Mark+Anderson&background=10B981&color=fff'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      role: 'participant',
      isActive: true,
      isSpeaking: false,
      hasRaisedHand: true,
      profileImage: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff'
    },
    {
      id: '5',
      name: 'Alex Wong',
      role: 'evaluator',
      isActive: true,
      isSpeaking: false,
      hasRaisedHand: false,
      profileImage: 'https://ui-avatars.com/api/?name=Alex+Wong&background=F59E0B&color=fff'
    }
  ],
  messages: [
    {
      id: '1',
      userId: '1',
      userName: 'John Moderator',
      userRole: 'moderator',
      content: 'Welcome everyone to our discussion on climate change solutions. Let\'s start by introducing ourselves and sharing one environmental practice you follow in your daily life.',
      timestamp: '2025-04-25T14:01:00'
    },
    {
      id: '2',
      userId: '3',
      userName: 'Mark Anderson',
      userRole: 'participant',
      content: 'Hello everyone! I\'m Mark. One practice I follow is using public transportation instead of driving whenever possible.',
      timestamp: '2025-04-25T14:02:30'
    },
    {
      id: '3',
      userId: '4',
      userName: 'Sarah Johnson',
      userRole: 'participant',
      content: 'Hi all, I\'m Sarah. I try to minimize single-use plastics by carrying my own water bottle and shopping bags.',
      timestamp: '2025-04-25T14:03:45'
    },
    {
      id: '4',
      userId: '5',
      userName: 'Alex Wong',
      userRole: 'evaluator',
      content: 'Great introductions so far. Remember to consider both individual and systemic approaches in your discussion.',
      timestamp: '2025-04-25T14:05:10'
    }
  ]
};

const SessionRoom = () => {
  const { sessionId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messageInput, setMessageInput] = useState('');
  const [session, setSession] = useState(mockSession);
  const [timeRemaining, setTimeRemaining] = useState('00:00:00');
  const [isMicActive, setIsMicActive] = useState(false);
  const [hasRaisedHand, setHasRaisedHand] = useState(false);
  
  // Calculate remaining time
  useEffect(() => {
    if (!session) return;
    
    const endTime = new Date(session.date);
    endTime.setMinutes(endTime.getMinutes() + session.duration);
    
    const interval = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('00:00:00');
        clearInterval(interval);
        toast.info("Session has ended");
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, [session]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [session?.messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentUser) return;
    
    // In a real app, this would send the message to a server
    const newMessage = {
      id: `${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      content: messageInput,
      timestamp: new Date().toISOString()
    };
    
    setSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...prev.messages, newMessage]
      };
    });
    
    setMessageInput('');
  };
  
  const toggleMicrophone = () => {
    // In a real app, this would toggle the microphone state in the voice chat
    setIsMicActive(!isMicActive);
    toast.info(isMicActive ? "Microphone disabled" : "Microphone enabled");
  };
  
  const toggleRaiseHand = () => {
    // In a real app, this would notify the moderator
    setHasRaisedHand(!hasRaisedHand);
    toast.info(hasRaisedHand ? "Hand lowered" : "Hand raised - moderator notified");
  };
  
  const handleLeaveSession = () => {
    // In a real app, this would disconnect from the session
    navigate('/participant/sessions');
    toast.info("You have left the session");
  };
  
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
  
  if (!session) {
    return (
      <MainLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Session Not Found</CardTitle>
              <CardDescription>
                The session you're looking for doesn't exist or has ended.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/participant/sessions')} className="w-full">
                Back to Sessions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{session.title}</h1>
            <p className="text-muted-foreground">
              {session.description}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{timeRemaining}</span>
            </Badge>
            <Button variant="destructive" size="sm" onClick={handleLeaveSession}>
              Leave Session
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Discussion</CardTitle>
                  <Badge>{session.type}</Badge>
                </div>
                <CardDescription>Topic: {session.topic}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden flex flex-col p-0">
                <div className="flex-grow overflow-y-auto p-4">
                  <div className="space-y-4">
                    {session.messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex gap-3 ${message.userId === currentUser?.id ? 'justify-end' : ''}`}
                      >
                        {message.userId !== currentUser?.id && (
                          <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                            <img 
                              src={session.participants.find(p => p.id === message.userId)?.profileImage || 
                                  (message.userId === session.moderator.id ? session.moderator.profileImage : '')}
                              alt={message.userName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className={`max-w-[80%] ${message.userId === currentUser?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'} 
                                         rounded-lg px-3 py-2`}>
                          <div className="flex justify-between items-center gap-2 mb-1">
                            <span className={`text-xs font-medium ${message.userId === currentUser?.id ? 'text-primary-foreground' : 
                                            message.userRole === 'moderator' ? 'text-speakspace-moderator' : 
                                            message.userRole === 'evaluator' ? 'text-speakspace-evaluator' : ''}`}>
                              {message.userName} 
                              {message.userRole === 'moderator' ? ' (Moderator)' : 
                               message.userRole === 'evaluator' ? ' (Evaluator)' : ''}
                            </span>
                            <span className={`text-xs ${message.userId === currentUser?.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm break-words">{message.content}</p>
                        </div>
                        {message.userId === currentUser?.id && (
                          <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                            <img 
                              src={currentUser.profileImage || `https://ui-avatars.com/api/?name=${currentUser.name}`} 
                              alt={currentUser.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                <Separator />
                <div className="p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button type="button" size="icon" variant="outline" onClick={toggleMicrophone}>
                            {isMicActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isMicActive ? 'Disable microphone' : 'Enable microphone'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            type="button" 
                            size="icon" 
                            variant={hasRaisedHand ? "secondary" : "outline"} 
                            onClick={toggleRaiseHand}
                          >
                            <Hand className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{hasRaisedHand ? 'Lower hand' : 'Raise hand to speak'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button type="submit">
                      <SendHorizontal className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Participants
                </CardTitle>
                <CardDescription>{session.participants.length + 1} people in session</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto p-0">
                <div className="p-4 space-y-3">
                  {/* Moderator */}
                  <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img 
                        src={session.moderator.profileImage} 
                        alt={session.moderator.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{session.moderator.name}</p>
                      <Badge variant="outline" className="text-xs bg-speakspace-moderator text-white">Moderator</Badge>
                    </div>
                  </div>
                  
                  {/* Other participants */}
                  {session.participants.map(participant => (
                    <div 
                      key={participant.id} 
                      className={`flex items-center gap-3 p-2 rounded-md ${
                        participant.isSpeaking ? 'bg-primary/10 border border-primary/30' : 
                        participant.id === currentUser.id ? 'bg-secondary/20' : ''
                      }`}
                    >
                      <div className="h-8 w-8 rounded-full overflow-hidden relative">
                        <img 
                          src={participant.profileImage} 
                          alt={participant.name}
                          className="h-full w-full object-cover"
                        />
                        {participant.isSpeaking && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Mic className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">
                            {participant.name}
                            {participant.id === currentUser.id ? ' (You)' : ''}
                          </p>
                          {participant.hasRaisedHand && (
                            <Hand className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            participant.role === 'evaluator' 
                              ? 'bg-speakspace-evaluator text-white' 
                              : 'bg-speakspace-participant text-white'
                          }`}
                        >
                          {participant.role === 'evaluator' ? 'Evaluator' : 'Participant'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="w-full space-y-2">
                  <p className="text-xs text-muted-foreground">Session Guidelines:</p>
                  <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                    <li>Stay on topic and be respectful</li>
                    <li>Raise your hand to get moderator attention</li>
                    <li>Keep responses concise and clear</li>
                    <li>Allow others to speak without interruption</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SessionRoom;
