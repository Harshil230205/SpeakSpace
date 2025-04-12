
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getSessionById, getSessionMessages, currentUser, Session, Message, getUserById } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

interface ChatRoomProps {
  sessionId: string;
}

const ChatRoom = ({ sessionId }: ChatRoomProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(getSessionMessages(sessionId) || []);
  const [newMessage, setNewMessage] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);
  const [sessionData, setSessionData] = useState<Session | undefined>(getSessionById(sessionId));
  const [timeLeft, setTimeLeft] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (sessionData?.status === 'active' && sessionData?.duration) {
      const endTime = new Date(sessionData.scheduledFor).getTime() + sessionData.duration * 60 * 1000;
      const now = new Date().getTime();
      const remainingMs = endTime - now;
      
      if (remainingMs > 0) {
        const timer = setInterval(() => {
          const currentTime = new Date().getTime();
          const remaining = endTime - currentTime;
          
          if (remaining <= 0) {
            clearInterval(timer);
            setTimeLeft("Time's up");
            return;
          }
          
          const minutes = Math.floor(remaining / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          setTimeLeft(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        }, 1000);
        
        return () => clearInterval(timer);
      } else {
        setTimeLeft("Time's up");
      }
    }
  }, [sessionData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: `msg-${Date.now()}`,
      sessionId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const toggleMic = () => {
    if (isMicActive) {
      setIsMicActive(false);
      toast({
        title: 'Microphone disabled',
        description: 'Your microphone has been turned off',
      });
    } else {
      setIsMicActive(true);
      toast({
        title: 'Microphone enabled',
        description: 'Your microphone is now active',
      });
    }
  };

  if (!sessionData) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-2">Session not found</h2>
        <p className="text-muted-foreground">The session you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] bg-white rounded-lg shadow-sm border">
      {/* Chat header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">{sessionData.title}</h2>
          <p className="text-sm text-muted-foreground">Topic: {sessionData.topic}</p>
        </div>
        <div className="flex items-center gap-2">
          {sessionData.status === 'active' && timeLeft && (
            <Badge variant="outline" className="text-sm flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeLeft}
            </Badge>
          )}
          <Badge variant={
            sessionData.status === 'active' 
              ? 'default' 
              : sessionData.status === 'upcoming' 
              ? 'secondary' 
              : 'outline'
          }>
            {sessionData.status.charAt(0).toUpperCase() + sessionData.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col">
          {messages.length > 0 ? (
            messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const user = getUserById(message.senderId);
              const messageTime = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">{messageTime}</span>
                        <span className="text-sm font-medium">{message.senderName}</span>
                        <Badge variant="outline" className="text-xs h-5 px-1.5">
                          {message.senderRole}
                        </Badge>
                      </div>
                      <div className={`chat-bubble ${isCurrentUser ? 'chat-bubble-sender' : 'chat-bubble-receiver'}`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Chat input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant={isMicActive ? "default" : "outline"}
            onClick={toggleMic}
            className="flex-shrink-0"
          >
            {isMicActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="flex-shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
