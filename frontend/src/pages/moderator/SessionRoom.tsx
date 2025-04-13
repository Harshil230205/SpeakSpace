
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  Clock,
  Send,
  Mic,
  MicOff,
  Settings,
  X,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

// Mock session data
const mockSession = {
  id: '1',
  title: 'Corporate Leadership Strategies',
  description: 'Discussion about effective leadership techniques in corporate environments',
  date: '2025-04-15T14:00:00',
  duration: 60, // minutes
  status: 'active',
  participants: [
    { id: '1', name: 'Jane Participant', role: 'participant', avatar: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff' },
    { id: '2', name: 'John Smith', role: 'participant', avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=10B981&color=fff' },
    { id: '3', name: 'Sarah Johnson', role: 'participant', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff' },
    { id: '4', name: 'Mike Brown', role: 'participant', avatar: 'https://ui-avatars.com/api/?name=Mike+Brown&background=10B981&color=fff' },
    { id: '5', name: 'Alex Evaluator', role: 'evaluator', avatar: 'https://ui-avatars.com/api/?name=Alex+Evaluator&background=F59E0B&color=fff' },
  ],
  moderator: {
    id: 'moderator1',
    name: 'John Moderator',
    role: 'moderator',
    avatar: 'https://ui-avatars.com/api/?name=John+Moderator&background=4F46E5&color=fff'
  }
};

// Mock messages for the chat
const initialMessages = [
  {
    id: '1',
    senderId: 'moderator1',
    senderName: 'John Moderator',
    role: 'moderator',
    content: 'Welcome everyone to our discussion on Corporate Leadership Strategies. Let\'s start with a brief introduction from each participant.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=John+Moderator&background=4F46E5&color=fff'
  },
  {
    id: '2',
    senderId: '1',
    senderName: 'Jane Participant',
    role: 'participant',
    content: 'Hi everyone, I\'m Jane. I\'ve been working in leadership roles for about 5 years now in the tech industry.',
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff'
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'John Smith',
    role: 'participant',
    content: 'Hello! I\'m John, and I\'m currently a team lead in finance with 3 years of experience.',
    timestamp: new Date(Date.now() - 1000 * 60 * 13).toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=10B981&color=fff'
  },
  {
    id: '4',
    senderId: '3',
    senderName: 'Sarah Johnson',
    role: 'participant',
    content: 'Hi, I\'m Sarah. I\'m new to leadership and looking to learn more about effective strategies.',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff'
  },
  {
    id: '5',
    senderId: 'moderator1',
    senderName: 'John Moderator',
    role: 'moderator',
    content: 'Great! Let\'s start by discussing what you believe are the most important qualities of an effective leader in today\'s corporate environment.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=John+Moderator&background=4F46E5&color=fff'
  },
  {
    id: '6',
    senderId: '1',
    senderName: 'Jane Participant',
    role: 'participant',
    content: 'I think adaptability and emotional intelligence are crucial. The workplace is changing rapidly, and leaders need to adapt and understand their team\'s needs.',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff'
  },
  {
    id: '7',
    senderId: '4',
    senderName: 'Mike Brown',
    role: 'participant',
    content: 'I agree with Jane. I\'d add that transparency and clear communication are essential. Teams work better when they understand the vision and their role in it.',
    timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Mike+Brown&background=10B981&color=fff'
  },
];

type ParticipantStatus = {
  id: string;
  isActive: boolean;
  isSpeaking: boolean;
  micMuted: boolean;
  lastActive: Date;
  participationTime: number; // in seconds
};

const SessionRoom = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { currentUser } = useAuth();
  const [session] = useState(mockSession);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [timer, setTimer] = useState(session.duration * 60); // Convert minutes to seconds
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [participantStatuses, setParticipantStatuses] = useState<Record<string, ParticipantStatus>>({});
  const [userMicMuted, setUserMicMuted] = useState(true);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize participant statuses
  useEffect(() => {
    const initialStatuses: Record<string, ParticipantStatus> = {};
    session.participants.forEach(participant => {
      initialStatuses[participant.id] = {
        id: participant.id,
        isActive: true,
        isSpeaking: false,
        micMuted: true,
        lastActive: new Date(),
        participationTime: Math.floor(Math.random() * 120), // Random time for demo
      };
    });
    
    // Add moderator to statuses
    initialStatuses[session.moderator.id] = {
      id: session.moderator.id,
      isActive: true,
      isSpeaking: false,
      micMuted: false,
      lastActive: new Date(),
      participationTime: Math.floor(Math.random() * 120), // Random time for demo
    };
    
    setParticipantStatuses(initialStatuses);
  }, [session]);

  // Session timer
  useEffect(() => {
    if (!isSessionActive || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSessionActive, timer]);

  // Update speaking status randomly for demo purposes
  useEffect(() => {
    if (!isSessionActive) return;

    const interval = setInterval(() => {
      setParticipantStatuses(prevStatuses => {
        const newStatuses = { ...prevStatuses };
        
        Object.keys(newStatuses).forEach(id => {
          // Only update if mic is not muted
          if (!newStatuses[id].micMuted) {
            // Randomly change speaking status
            newStatuses[id].isSpeaking = Math.random() > 0.7;
            
            // Update participation time if speaking
            if (newStatuses[id].isSpeaking) {
              newStatuses[id].participationTime += 1;
              newStatuses[id].lastActive = new Date();
            }
          } else {
            newStatuses[id].isSpeaking = false;
          }
        });
        
        return newStatuses;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSessionActive]);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      senderId: currentUser?.id || 'unknown',
      senderName: currentUser?.name || 'Unknown User',
      role: currentUser?.role || 'participant',
      content: newMessage,
      timestamp: new Date().toISOString(),
      avatar: currentUser?.profileImage || `https://ui-avatars.com/api/?name=${currentUser?.name || 'Unknown'}`
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Update participant activity time
    if (currentUser) {
      setParticipantStatuses(prev => {
        const updated = { ...prev };
        if (updated[currentUser.id]) {
          updated[currentUser.id].lastActive = new Date();
          updated[currentUser.id].participationTime += 5; // Add some participation time for sending a message
        }
        return updated;
      });
    }
  };

  const toggleUserMic = () => {
    if (!currentUser) return;
    
    setUserMicMuted(!userMicMuted);
    
    setParticipantStatuses(prev => {
      const updated = { ...prev };
      if (updated[currentUser.id]) {
        updated[currentUser.id].micMuted = !userMicMuted;
      }
      return updated;
    });
    
    toast.success(userMicMuted ? "Microphone activated" : "Microphone muted");
  };

  const pauseSession = () => {
    setIsSessionActive(false);
    toast.info("Session paused");
  };

  const resumeSession = () => {
    setIsSessionActive(true);
    toast.success("Session resumed");
  };

  const endSession = () => {
    toast.success("Session ended successfully");
    window.location.href = '/moderator/sessions';
  };

  const formatTotalTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getActiveParticipantsCount = () => {
    return Object.values(participantStatuses).filter(s => s.isActive).length;
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b p-4">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">{session.title}</h1>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{getActiveParticipantsCount()} active</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{formatTime(timer)} remaining</span>
              </div>
              <Badge
                variant="outline"
                className={`${
                  isSessionActive ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                }`}
              >
                {isSessionActive ? 'Active' : 'Paused'}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            {isSessionActive ? (
              <Button
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                onClick={pauseSession}
              >
                <PauseCircle className="mr-2 h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50"
                onClick={resumeSession}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Resume
              </Button>
            )}
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                  <StopCircle className="mr-2 h-4 w-4" />
                  End Session
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>End this session?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will end the session for all participants. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={endSession} className="bg-red-500 hover:bg-red-600">
                    End Session
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Left Side - Chat */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col">
          <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
            <h2 className="font-semibold flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-speakspace-primary" />
              Discussion Chat
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={userMicMuted ? "text-gray-500" : "text-green-600"}
                onClick={toggleUserMic}
              >
                {userMicMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] flex ${
                      message.senderId === currentUser?.id ? 'flex-row-reverse' : 'flex-row'
                    } items-start gap-2`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.senderId === currentUser?.id
                          ? 'bg-speakspace-primary text-white rounded-tr-none'
                          : message.role === 'moderator'
                          ? 'bg-speakspace-moderator/10 text-speakspace-moderator rounded-tl-none'
                          : message.role === 'evaluator'
                          ? 'bg-speakspace-evaluator/10 text-speakspace-evaluator rounded-tl-none'
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-medium ${
                            message.senderId === currentUser?.id
                              ? 'text-white/90'
                              : 'text-gray-500'
                          }`}
                        >
                          {message.senderName}
                        </span>
                        <span
                          className={`text-xs ${
                            message.senderId === currentUser?.id
                              ? 'text-white/70'
                              : 'text-gray-400'
                          }`}
                        >
                          {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>

          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t bg-gray-50 flex items-center space-x-2"
          >
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              disabled={!isSessionActive}
            />
            <Button
              type="submit"
              className="bg-speakspace-primary hover:bg-speakspace-primary/90"
              disabled={!isSessionActive || !newMessage.trim()}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>

        {/* Right Side - Participants */}
        <div className="md:w-80 bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col">
          <Tabs defaultValue="participants" className="w-full h-full flex flex-col">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="participants" className="flex-1">
                <Users className="h-4 w-4 mr-2" />
                Participants
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="participants" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1">
                <div className="p-3 space-y-1">
                  {/* Moderator */}
                  <div className="bg-speakspace-moderator/5 border border-speakspace-moderator/20 rounded-md p-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={session.moderator.avatar} />
                          <AvatarFallback>{session.moderator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {participantStatuses[session.moderator.id]?.isSpeaking && (
                          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{session.moderator.name}</p>
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-speakspace-moderator/20 text-speakspace-moderator border-speakspace-moderator/30 text-xs">
                            Moderator
                          </Badge>
                        </div>
                      </div>
                      {participantStatuses[session.moderator.id]?.micMuted ? (
                        <MicOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Mic className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  {/* Participants */}
                  <h3 className="text-xs font-medium text-gray-500 mb-2">PARTICIPANTS</h3>
                  <div className="space-y-1">
                    {session.participants
                      .filter(p => p.role === 'participant')
                      .map(participant => (
                        <div 
                          key={participant.id} 
                          className="border rounded-md p-2 flex items-center space-x-2"
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={participant.avatar} />
                              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {participantStatuses[participant.id]?.isSpeaking && (
                              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{participant.name}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="bg-speakspace-participant/20 text-speakspace-participant border-speakspace-participant/30 text-xs">
                                Participant
                              </Badge>
                            </div>
                          </div>
                          {participantStatuses[participant.id]?.micMuted ? (
                            <MicOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Mic className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                  </div>
                  
                  <Separator className="my-2" />
                  
                  {/* Evaluators */}
                  <h3 className="text-xs font-medium text-gray-500 mb-2">EVALUATORS</h3>
                  <div className="space-y-1">
                    {session.participants
                      .filter(p => p.role === 'evaluator')
                      .map(evaluator => (
                        <div 
                          key={evaluator.id} 
                          className="border rounded-md p-2 flex items-center space-x-2"
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={evaluator.avatar} />
                              <AvatarFallback>{evaluator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {participantStatuses[evaluator.id]?.isSpeaking && (
                              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{evaluator.name}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="bg-speakspace-evaluator/20 text-speakspace-evaluator border-speakspace-evaluator/30 text-xs">
                                Evaluator
                              </Badge>
                            </div>
                          </div>
                          {participantStatuses[evaluator.id]?.micMuted ? (
                            <MicOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Mic className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="activity" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  <h3 className="font-medium">Participation Time</h3>
                  
                  <div className="space-y-3">
                    {Object.values(participantStatuses)
                      .sort((a, b) => b.participationTime - a.participationTime)
                      .map(status => {
                        const participant = [session.moderator, ...session.participants].find(p => p.id === status.id);
                        if (!participant) return null;
                        
                        // Calculate percentage of total time
                        const totalSessionTime = session.duration * 60;
                        const percentage = Math.min(100, Math.round((status.participationTime / totalSessionTime) * 100));
                        
                        return (
                          <div key={status.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={participant.avatar} />
                                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{participant.name}</span>
                              </div>
                              <span className="text-sm text-gray-500">{formatTotalTime(status.participationTime)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  participant.role === 'moderator'
                                    ? 'bg-speakspace-moderator'
                                    : participant.role === 'evaluator'
                                    ? 'bg-speakspace-evaluator'
                                    : 'bg-speakspace-participant'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Participation Balance</h3>
                    
                    {(() => {
                      // Calculate standard deviation of participation
                      const participationValues = Object.values(participantStatuses)
                        .filter(s => 
                          session.participants.find(p => p.id === s.id)?.role === 'participant'
                        )
                        .map(s => s.participationTime);
                      
                      const avg = participationValues.reduce((a, b) => a + b, 0) / participationValues.length;
                      const variance = participationValues.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / participationValues.length;
                      const stdDev = Math.sqrt(variance);
                      
                      const balancePercentage = Math.max(0, 100 - (stdDev / avg * 100));
                      
                      let balanceStatus = 'Excellent';
                      let statusColor = 'text-green-600';
                      let warning = '';
                      
                      if (balancePercentage < 60) {
                        balanceStatus = 'Poor';
                        statusColor = 'text-red-600';
                        warning = 'Some participants are dominating the conversation';
                      } else if (balancePercentage < 80) {
                        balanceStatus = 'Fair';
                        statusColor = 'text-yellow-600';
                        warning = 'Participation could be more balanced';
                      }
                      
                      return (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Balance Score</span>
                            <span className={`font-semibold ${statusColor}`}>{Math.round(balancePercentage)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                balancePercentage >= 80
                                  ? 'bg-green-500'
                                  : balancePercentage >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${balancePercentage}%` }}
                            ></div>
                          </div>
                          <div className="text-sm font-medium mt-1 flex items-center">
                            <span className={statusColor}>{balanceStatus}</span>
                          </div>
                          {warning && (
                            <div className="mt-2 flex items-start space-x-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded-md border border-yellow-200">
                              <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                              <p>{warning}</p>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SessionRoom;
