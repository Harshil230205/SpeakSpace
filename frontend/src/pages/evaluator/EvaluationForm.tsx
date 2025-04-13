
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Star, Send, User, CheckCircle, XCircle } from 'lucide-react';
import { toast } from "sonner";

// Mock participant data for evaluation
const mockParticipantData = {
  id: '2',
  name: 'Jane Participant',
  profileImage: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff',
  sessionId: '1',
  sessionTitle: 'Marketing Strategy Discussion',
  sessionType: 'Group Discussion',
  performance: {
    contributions: 12,
    speakingTime: 435, // seconds
    questions: 3,
    responses: 8
  }
};

const EvaluationForm = () => {
  const { sessionId, participantId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [participantData, setParticipantData] = useState(mockParticipantData);
  const [ratings, setRatings] = useState({
    communication: 0,
    confidence: 0,
    reasoning: 0,
    engagement: 0
  });
  const [strengthsAndWeaknesses, setStrengthsAndWeaknesses] = useState({
    strengths: '',
    weaknesses: ''
  });
  const [feedback, setFeedback] = useState('');
  const [improvementTips, setImprovementTips] = useState('');
  
  // In a real app, this would fetch participant data from an API
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const handleRatingChange = (category: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const getOverallRating = () => {
    const { communication, confidence, reasoning, engagement } = ratings;
    const total = communication + confidence + reasoning + engagement;
    return total > 0 ? (total / 4).toFixed(1) : '0.0';
  };
  
  const isFormComplete = () => {
    const allRatingsProvided = Object.values(ratings).every(rating => rating > 0);
    const textFieldsFilled = 
      strengthsAndWeaknesses.strengths.trim().length > 0 && 
      strengthsAndWeaknesses.weaknesses.trim().length > 0 && 
      feedback.trim().length > 0 && 
      improvementTips.trim().length > 0;
    
    return allRatingsProvided && textFieldsFilled;
  };
  
  const submitEvaluation = () => {
    if (!isFormComplete()) {
      toast.error('Please complete all sections of the evaluation form');
      return;
    }
    
    // In a real app, this would submit the evaluation to a backend API
    console.log('Submitting evaluation', {
      participantId,
      sessionId,
      ratings,
      strengthsAndWeaknesses,
      feedback,
      improvementTips,
      overallRating: getOverallRating()
    });
    
    toast.success('Evaluation submitted successfully');
    navigate(`/evaluator/sessions/${sessionId}/room`);
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
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/evaluator/sessions/${sessionId}/room`)} 
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Session</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Participant Evaluation</h1>
            <p className="text-muted-foreground">
              Provide detailed feedback for this participant's performance
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl font-bold">{getOverallRating()}</div>
            <div className="text-xs text-muted-foreground">Overall Rating</div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
                <img 
                  src={participantData.profileImage} 
                  alt={participantData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <CardTitle>{participantData.name}</CardTitle>
                <CardDescription>
                  Session: {participantData.sessionTitle}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold">{participantData.performance.contributions}</div>
                <div className="text-xs text-muted-foreground text-center">Total Contributions</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold">{formatDuration(participantData.performance.speakingTime)}</div>
                <div className="text-xs text-muted-foreground text-center">Speaking Time</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold">{participantData.performance.questions}</div>
                <div className="text-xs text-muted-foreground text-center">Questions Asked</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold">{participantData.performance.responses}</div>
                <div className="text-xs text-muted-foreground text-center">Responses Given</div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-base font-medium mb-4">Performance Ratings</h3>
              <div className="space-y-6">
                {[
                  { key: 'communication', label: 'Communication', description: 'Clarity, articulation, and effectiveness in conveying ideas' },
                  { key: 'confidence', label: 'Confidence', description: 'Self-assurance, composure, and presentation style' },
                  { key: 'reasoning', label: 'Reasoning & Logic', description: 'Analytical thinking, problem-solving, and argument construction' },
                  { key: 'engagement', label: 'Engagement', description: 'Active participation, listening skills, and interaction with others' }
                ].map((category) => (
                  <div key={category.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium">{category.label}</label>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </div>
                      <span className="text-sm font-medium">
                        {ratings[category.key as keyof typeof ratings]}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 10 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleRatingChange(category.key, i + 1)}
                          className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
                            ratings[category.key as keyof typeof ratings] >= i + 1
                              ? 'bg-speakspace-primary text-white'
                              : 'bg-muted hover:bg-muted-foreground/20'
                          }`}
                          aria-label={`Rate ${i + 1}`}
                        >
                          <span className="text-xs">{i + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium">Strengths</label>
                <Textarea 
                  placeholder="List key strengths demonstrated during the session..."
                  className="min-h-[120px]"
                  value={strengthsAndWeaknesses.strengths}
                  onChange={(e) => setStrengthsAndWeaknesses(prev => ({ ...prev, strengths: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Areas for Improvement</label>
                <Textarea 
                  placeholder="List areas where the participant could improve..."
                  className="min-h-[120px]"
                  value={strengthsAndWeaknesses.weaknesses}
                  onChange={(e) => setStrengthsAndWeaknesses(prev => ({ ...prev, weaknesses: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-medium">Detailed Feedback</label>
              <Textarea 
                placeholder="Provide comprehensive feedback on the participant's performance..."
                className="min-h-[150px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-medium">Improvement Tips</label>
              <Textarea 
                placeholder="Suggest specific actions the participant can take to improve..."
                className="min-h-[120px]"
                value={improvementTips}
                onChange={(e) => setImprovementTips(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => navigate(`/evaluator/sessions/${sessionId}/room`)}
            >
              <XCircle className="h-4 w-4" />
              Cancel
            </Button>
            <Button 
              className="flex items-center gap-1"
              onClick={submitEvaluation}
            >
              <CheckCircle className="h-4 w-4" />
              Submit Evaluation
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EvaluationForm;
