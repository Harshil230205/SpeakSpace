
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ChatRoom from '@/components/discussion/ChatRoom';
import { Session, getUserById, getSessionById, currentUser } from '@/utils/mockData';

const Discussion = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('sessionId') || '';
  const [session, setSession] = useState<Session | undefined>(getSessionById(sessionId));
  
  if (!session) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Link to="/sessions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sessions
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center h-64">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6 pb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Session Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  The session you're looking for doesn't exist or has been removed.
                </p>
                <Link to="/sessions">
                  <Button>Browse Available Sessions</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  const moderator = getUserById(session.createdBy);
  const participants = session.participants.map(id => getUserById(id)).filter(Boolean);
  const evaluators = session.evaluators.map(id => getUserById(id)).filter(Boolean);
  
  const formattedDate = new Date(session.scheduledFor).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const formattedTime = new Date(session.scheduledFor).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const userRole = participants.find(p => p?.id === currentUser.id) 
    ? 'participant' 
    : evaluators.find(e => e?.id === currentUser.id)
    ? 'evaluator'
    : moderator?.id === currentUser.id
    ? 'moderator'
    : 'viewer';
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link to="/sessions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sessions
              </Button>
            </Link>
            
            <Badge variant={
              session.status === 'active' 
                ? 'default' 
                : session.status === 'upcoming' 
                ? 'secondary' 
                : 'outline'
            }>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            {userRole !== 'viewer' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="capitalize">
                      Your Role: {userRole}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You're participating in this session as a {userRole}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {session.status === 'completed' && (
              <Link to={`/feedback?sessionId=${session.id}`}>
                <Button size="sm" variant="default">
                  View Feedback
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold">{session.title}</h1>
          <p className="text-muted-foreground mt-1">{session.description}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="discussion">
              <TabsList className="mb-4">
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="info">Session Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discussion">
                <ChatRoom sessionId={sessionId} />
              </TabsContent>
              
              <TabsContent value="info">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <Info className="h-5 w-5 mr-2 text-primary" />
                          Session Details
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Topic</p>
                            <p className="font-medium">{session.topic}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Date</p>
                              <p>{formattedDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Time</p>
                              <p>{formattedTime}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p>{session.duration} minutes</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Moderator</h3>
                        {moderator && (
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={moderator.avatar} />
                              <AvatarFallback>{moderator.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{moderator.name}</p>
                              <p className="text-sm text-muted-foreground">Moderator</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Participants ({participants.length})</h3>
                        <div className="space-y-3">
                          {participants.map(participant => participant && (
                            <div key={participant.id} className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={participant.avatar} />
                                <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{participant.name}</p>
                                <p className="text-sm text-muted-foreground">Participant</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Evaluators ({evaluators.length})</h3>
                        <div className="space-y-3">
                          {evaluators.map(evaluator => evaluator && (
                            <div key={evaluator.id} className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={evaluator.avatar} />
                                <AvatarFallback>{evaluator.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{evaluator.name}</p>
                                <p className="text-sm text-muted-foreground">Evaluator</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="hidden lg:block">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Participants</h3>
                <div className="space-y-3">
                  {moderator && (
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={moderator.avatar} />
                          <AvatarFallback>{moderator.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{moderator.name}</p>
                        <p className="text-xs text-muted-foreground">Moderator</p>
                      </div>
                    </div>
                  )}
                  
                  {participants.map(participant => participant && (
                    <div key={participant.id} className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">Participant</p>
                      </div>
                    </div>
                  ))}
                  
                  {evaluators.map(evaluator => evaluator && (
                    <div key={evaluator.id} className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={evaluator.avatar} />
                          <AvatarFallback>{evaluator.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{evaluator.name}</p>
                        <p className="text-xs text-muted-foreground">Evaluator</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="font-semibold mb-2">Session Info</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Topic</p>
                    <p>{session.topic}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p>{session.duration} minutes</p>
                  </div>
                </div>
                
                {currentUser.role === 'evaluator' && session.status === 'completed' && (
                  <>
                    <Separator className="my-4" />
                    <Link to={`/feedback?sessionId=${session.id}`}>
                      <Button className="w-full">Provide Feedback</Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Discussion;
