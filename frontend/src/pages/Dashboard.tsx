import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart as BarChartIcon, Calendar, Users, MessageSquare, Activity, Clock, Award } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const performanceData = [
  { name: 'Jan', communication: 65, confidence: 55, reasoning: 70, engagement: 60 },
  { name: 'Feb', communication: 68, confidence: 59, reasoning: 72, engagement: 63 },
  { name: 'Mar', communication: 72, confidence: 63, reasoning: 75, engagement: 67 },
  { name: 'Apr', communication: 75, confidence: 68, reasoning: 78, engagement: 70 },
  { name: 'May', communication: 78, confidence: 72, reasoning: 80, engagement: 74 },
  { name: 'Jun', communication: 82, confidence: 76, reasoning: 83, engagement: 79 },
];

const sessionCountData = [
  { name: 'Jan', count: 2 },
  { name: 'Feb', count: 3 },
  { name: 'Mar', count: 4 },
  { name: 'Apr', count: 3 },
  { name: 'May', count: 5 },
  { name: 'Jun', count: 6 },
];

const upcomingSessions = [
  {
    id: '1',
    title: 'Corporate Leadership Strategies',
    date: '2025-04-15T14:00:00',
    duration: 60,
    participantsCount: 8,
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Technical Interview Preparation',
    date: '2025-04-18T10:00:00',
    duration: 45,
    participantsCount: 6,
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Product Management Discussion',
    date: '2025-04-20T16:30:00',
    duration: 90,
    participantsCount: 10,
    status: 'scheduled'
  }
];

const recentFeedback = [
  {
    id: '1',
    sessionTitle: 'Marketing Strategy Discussion',
    date: '2025-04-10',
    ratings: {
      communication: 85,
      confidence: 78,
      reasoning: 90,
      engagement: 82
    },
    comment: 'Great contributions with well-structured arguments. Could improve on ensuring equal participation from all team members.'
  },
  {
    id: '2',
    sessionTitle: 'Software Engineering Interview',
    date: '2025-04-05',
    ratings: {
      communication: 88,
      confidence: 82,
      reasoning: 92,
      engagement: 85
    },
    comment: 'Excellent technical knowledge. Explained complex concepts clearly. Work on more concise responses.'
  }
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const getPerformanceAverages = () => {
    const lastMonthData = performanceData[performanceData.length - 1];
    return {
      communication: lastMonthData.communication,
      confidence: lastMonthData.confidence,
      reasoning: lastMonthData.reasoning,
      engagement: lastMonthData.engagement
    };
  };

  const performanceAverages = getPerformanceAverages();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {greeting}, {currentUser?.name}
            </h1>
            <p className="text-gray-500">
              Here's an overview of your SpeakSpace activity
            </p>
          </div>
          {currentUser?.role === 'moderator' && (
            <Button 
              onClick={() => navigate('/moderator/sessions/create')}
              className="btn-moderator mt-4 md:mt-0"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Create New Session
            </Button>
          )}
          {currentUser?.role === 'participant' && (
            <Button 
              onClick={() => navigate('/participant/sessions')}
              className="btn-participant mt-4 md:mt-0"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Browse Sessions
            </Button>
          )}
          {currentUser?.role === 'evaluator' && (
            <Button 
              onClick={() => navigate('/evaluator/sessions')}
              className="btn-evaluator mt-4 md:mt-0"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Sessions to Evaluate
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sessions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Communication Score
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceAverages.communication}%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Confidence Score
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceAverages.confidence}%</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Engagement Score
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceAverages.engagement}%</div>
              <p className="text-xs text-muted-foreground">
                +7% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Your skill development over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="communication" 
                    stroke="#6366F1" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#10B981" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reasoning" 
                    stroke="#F59E0B" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#8B5CF6" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Session Participation</CardTitle>
              <CardDescription>
                Number of sessions joined per month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sessionCountData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="count" 
                    fill="#6366F1" 
                    name="Sessions" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Your scheduled sessions for the next days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h4 className="font-semibold">{session.title}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {formatDate(session.date)}
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {session.participantsCount} participants
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {session.duration} min
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="shrink-0">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 py-6">
                  <Calendar className="h-12 w-12 text-gray-400" />
                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium">No upcoming sessions</p>
                    <p className="text-sm text-gray-500">Join or schedule a new session to get started</p>
                  </div>
                  <Button className="mt-2">
                    {currentUser?.role === 'moderator' ? 'Create Session' : 'Browse Sessions'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>
                The latest feedback from your sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentFeedback.length > 0 ? (
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="rounded-md border p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{feedback.sessionTitle}</h4>
                        <span className="text-xs text-gray-500">{feedback.date}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Communication</span>
                          <span className="font-medium">{feedback.ratings.communication}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Confidence</span>
                          <span className="font-medium">{feedback.ratings.confidence}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Reasoning</span>
                          <span className="font-medium">{feedback.ratings.reasoning}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Engagement</span>
                          <span className="font-medium">{feedback.ratings.engagement}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 py-6">
                  <MessageSquare className="h-12 w-12 text-gray-400" />
                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium">No feedback yet</p>
                    <p className="text-sm text-gray-500">Participate in sessions to receive feedback</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
