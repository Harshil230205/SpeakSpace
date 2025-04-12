
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeedbacksForSession, getSessionById, getUserById, Session, User, currentUser, Feedback } from '@/utils/mockData';

const FeedbackPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('sessionId') || '';
  
  const session = getSessionById(sessionId);
  const feedbacks = getFeedbacksForSession(sessionId);
  
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
  
  // Get participants and their feedback
  const participants = session.participants
    .map(id => {
      const user = getUserById(id);
      const feedback = feedbacks.find(f => f.participantId === id);
      
      return user ? { user, feedback } : null;
    })
    .filter(Boolean) as { user: User; feedback?: Feedback }[];
  
  // Is current user an evaluator for this session
  const isEvaluator = session.evaluators.includes(currentUser.id);
  
  // Is current user a participant in this session
  const isParticipant = session.participants.includes(currentUser.id);
  
  // Get feedback for current user if they're a participant
  const userFeedback = isParticipant 
    ? feedbacks.find(f => f.participantId === currentUser.id)
    : undefined;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/discussion?sessionId=${sessionId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Session
              </Button>
            </Link>
            
            <Badge variant="outline">
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold">Session Feedback</h1>
          <p className="text-muted-foreground mt-1">{session.title} - {session.topic}</p>
        </div>
        
        {isParticipant ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Feedback</h2>
            
            {userFeedback ? (
              <FeedbackForm 
                sessionId={sessionId} 
                participantId={currentUser.id} 
                existingFeedback={userFeedback} 
              />
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground mb-4">
                    You haven't received feedback for this session yet
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : isEvaluator ? (
          <div className="space-y-6">
            <Tabs defaultValue={participants[0]?.user.id}>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Participant Feedback</h2>
              </div>
              
              <TabsList className="mb-4">
                {participants.map(({ user }) => (
                  <TabsTrigger key={user.id} value={user.id} className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {participants.map(({ user, feedback }) => (
                <TabsContent key={user.id} value={user.id}>
                  <FeedbackForm 
                    sessionId={sessionId} 
                    participantId={user.id} 
                    existingFeedback={feedback} 
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground mb-4">
                You don't have permission to view or provide feedback for this session
              </p>
              <Link to="/sessions">
                <Button>Back to Sessions</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FeedbackPage;
