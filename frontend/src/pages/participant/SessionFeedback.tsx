
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, MessageSquare, Clock, Star, Award, ThumbsUp, Lightbulb } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from 'recharts';

// Mock session and feedback data
const mockSessionFeedback = {
  id: '4',
  title: 'Leadership Skills Workshop',
  description: 'Exploring effective leadership styles and communication techniques.',
  date: '2025-04-10T15:00:00',
  duration: 90,
  topic: 'Leadership',
  type: 'Workshop',
  moderator: {
    name: 'John Moderator',
    id: '1'
  },
  evaluator: {
    name: 'Alex Evaluator',
    id: '3',
    profileImage: 'https://ui-avatars.com/api/?name=Alex+Evaluator&background=F59E0B&color=fff'
  },
  performance: {
    communication: 8.5,
    confidence: 7.8,
    reasoning: 8.2,
    engagement: 9.0,
    overall: 8.4
  },
  feedback: [
    {
      category: 'Strengths',
      items: [
        'Clear and articulate communication style',
        'Excellent at summarizing complex ideas concisely',
        'Good use of relevant examples to support arguments',
        'Active listener who builds on others\' points'
      ]
    },
    {
      category: 'Areas for Improvement',
      items: [
        'Could be more assertive when making important points',
        'Sometimes hesitates before responding to challenging questions',
        'Could improve body language to appear more confident',
        'Would benefit from more concise responses in time-limited situations'
      ]
    }
  ],
  comments: [
    {
      id: '1',
      author: 'Alex Evaluator',
      role: 'evaluator',
      content: 'You demonstrated strong communication skills throughout the session. Your points were clear and well-structured. For future sessions, try to be more assertive when making key arguments - don\'t be afraid to take up space in the conversation.',
      timestamp: '2025-04-10T17:15:00',
      authorImage: 'https://ui-avatars.com/api/?name=Alex+Evaluator&background=F59E0B&color=fff'
    },
    {
      id: '2',
      author: 'John Moderator',
      role: 'moderator',
      content: 'Great participation in today\'s workshop. You contributed valuable insights and facilitated good discussion. Work on your confidence a bit more - your ideas are excellent and deserve to be presented with full conviction.',
      timestamp: '2025-04-10T17:30:00',
      authorImage: 'https://ui-avatars.com/api/?name=John+Moderator&background=4F46E5&color=fff'
    }
  ],
  tips: [
    'Practice speaking with more assertiveness by recording yourself and analyzing your tone',
    'Work on quick response techniques for impromptu questions',
    'Consider joining Toastmasters or similar groups for regular speaking practice',
    'Focus on maintaining confident body language even when unsure of content'
  ]
};

const SessionFeedback = () => {
  const { sessionId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(mockSessionFeedback);
  
  // In a real app, this would fetch the session feedback from an API
  useEffect(() => {
    // Simulating a data fetch
    console.log(`Fetching feedback for session ${sessionId}`);
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
  
  const radarData = [
    {
      subject: 'Communication',
      value: feedback.performance.communication,
      fullMark: 10,
    },
    {
      subject: 'Confidence',
      value: feedback.performance.confidence,
      fullMark: 10,
    },
    {
      subject: 'Reasoning',
      value: feedback.performance.reasoning,
      fullMark: 10,
    },
    {
      subject: 'Engagement',
      value: feedback.performance.engagement,
      fullMark: 10,
    },
  ];
  
  const getPerformanceLevel = (score: number) => {
    if (score >= 9) return { label: 'Excellent', color: 'text-green-600' };
    if (score >= 7.5) return { label: 'Very Good', color: 'text-emerald-600' };
    if (score >= 6) return { label: 'Good', color: 'text-blue-600' };
    if (score >= 5) return { label: 'Average', color: 'text-yellow-600' };
    return { label: 'Needs Improvement', color: 'text-red-600' };
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
            <CardContent className="flex justify-center">
              <Button onClick={() => navigate('/login')}>
                Log in as Participant
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  if (!feedback) {
    return (
      <MainLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Feedback Not Found</CardTitle>
              <CardDescription>
                The session feedback you're looking for doesn't exist.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={() => navigate('/participant/sessions')} asChild>
                <Link to="/participant/sessions">Back to Sessions</Link>
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/participant/sessions')} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sessions</span>
          </Button>
        </div>
        
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{feedback.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{feedback.type}</Badge>
            <span className="text-muted-foreground">
              Evaluated by {feedback.evaluator.name}
            </span>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            {feedback.description}
          </p>
        </div>
        
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(feedback.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{feedback.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span>Topic: {feedback.topic}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Performance Overview
              </CardTitle>
              <CardDescription>
                Your performance ratings from this session
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--foreground)' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} />
                    <Radar
                      name="Performance"
                      dataKey="value"
                      stroke="var(--primary)"
                      fill="var(--primary)"
                      fillOpacity={0.6}
                    />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg w-full">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{feedback.performance.overall}</span>
                    <span className="text-xs text-muted-foreground">/10</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className={`font-medium ${getPerformanceLevel(feedback.performance.overall).color}`}>
                    {getPerformanceLevel(feedback.performance.overall).label}
                  </span>
                </div>
                
                <Separator className="my-3" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Communication</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{feedback.performance.communication}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                      <span className={`text-xs ${getPerformanceLevel(feedback.performance.communication).color}`}>
                        ({getPerformanceLevel(feedback.performance.communication).label})
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{feedback.performance.confidence}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                      <span className={`text-xs ${getPerformanceLevel(feedback.performance.confidence).color}`}>
                        ({getPerformanceLevel(feedback.performance.confidence).label})
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Reasoning</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{feedback.performance.reasoning}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                      <span className={`text-xs ${getPerformanceLevel(feedback.performance.reasoning).color}`}>
                        ({getPerformanceLevel(feedback.performance.reasoning).label})
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Engagement</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{feedback.performance.engagement}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                      <span className={`text-xs ${getPerformanceLevel(feedback.performance.engagement).color}`}>
                        ({getPerformanceLevel(feedback.performance.engagement).label})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            {feedback.feedback.map((section, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    {section.category === 'Strengths' ? (
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                    )}
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-sm flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  Improvement Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {feedback.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Feedback Comments</CardTitle>
            <CardDescription>
              Detailed feedback from your evaluator and moderator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedback.comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
                      <img 
                        src={comment.authorImage} 
                        alt={comment.author} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{comment.author}</p>
                        <Badge variant="outline" className={`text-xs ${
                          comment.role === 'evaluator' 
                            ? 'bg-speakspace-evaluator text-white' 
                            : 'bg-speakspace-moderator text-white'
                        }`}>
                          {comment.role === 'evaluator' ? 'Evaluator' : 'Moderator'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(comment.timestamp)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SessionFeedback;
