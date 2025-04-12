
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SessionCard from '@/components/sessions/SessionCard';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import { Link } from 'react-router-dom';
import { currentUser, feedbacks, sessions, getRandomTip } from '@/utils/mockData';
import { Calendar, Clock, MessageSquare, Users, Info } from 'lucide-react';

const Dashboard = () => {
  // Get upcoming sessions
  const upcomingSessions = sessions.filter(session => 
    session.status === 'upcoming' && 
    (session.participants.includes(currentUser.id) || 
     session.evaluators.includes(currentUser.id) || 
     session.createdBy === currentUser.id)
  );
  
  // Get active sessions
  const activeSessions = sessions.filter(session => 
    session.status === 'active' && 
    (session.participants.includes(currentUser.id) || 
     session.evaluators.includes(currentUser.id) || 
     session.createdBy === currentUser.id)
  );
  
  // Get recent feedback if user is a participant
  const recentFeedback = currentUser.role === 'participant' ? 
    feedbacks.find(feedback => feedback.participantId === currentUser.id) : null;
  
  // Get random tips
  const interviewTip = getRandomTip('interview');
  const communicationTip = getRandomTip('communication');
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-3xl font-bold mb-2 pt-5">Welcome back, {currentUser.name}</h1>
          <p className="text-gray-500">
            Your role: <Badge className="ml-1">{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</Badge>
          </p>
        </div>
        
        {/* Active sessions section */}
        {activeSessions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Active Sessions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        )}
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
              <CardDescription>Sessions you're scheduled to join</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingSessions.length}</div>
              <div className="mt-4">
                <Link to="/sessions">
                  <Button variant="outline" size="sm">View All Sessions</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity</CardTitle>
              <CardDescription>Your recent platform engagement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" /> Discussions
                </span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center">
                  <Users className="h-4 w-4 mr-1" /> Collaborations
                </span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> Sessions Completed
                </span>
                <span className="font-semibold">8</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Tips</CardTitle>
              <CardDescription>Improve your skills with these tips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="font-medium mb-1">Interview Tip:</p>
                <p className="text-muted-foreground">{interviewTip}</p>
              </div>
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="font-medium mb-1">Communication Tip:</p>
                <p className="text-muted-foreground">{communicationTip}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming sessions section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Upcoming Sessions
          </h2>
          
          {upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {upcomingSessions.slice(0, 2).map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground mb-4">You don't have any upcoming sessions</p>
                <Link to="/sessions">
                  <Button>View All Sessions</Button>
                </Link>
              </CardContent>
            </Card>
          )}
          
          {upcomingSessions.length > 2 && (
            <div className="text-center mt-4">
              <Link to="/sessions">
                <Button variant="outline">View All Sessions</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Performance chart for participants */}
        {currentUser.role === 'participant' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Info className="h-5 w-5 mr-2 text-primary" />
              Your Performance
            </h2>
            <PerformanceChart userId={currentUser.id} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
