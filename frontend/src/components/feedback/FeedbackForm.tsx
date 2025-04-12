
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Feedback, Session, User, currentUser, getSessionById, getUserById } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

interface FeedbackFormProps {
  sessionId: string;
  participantId: string;
  existingFeedback?: Feedback;
}

const FeedbackForm = ({ sessionId, participantId, existingFeedback }: FeedbackFormProps) => {
  const { toast } = useToast();
  const [communication, setCommunication] = useState(existingFeedback?.ratings.communication || 3);
  const [confidence, setConfidence] = useState(existingFeedback?.ratings.confidence || 3);
  const [logic, setLogic] = useState(existingFeedback?.ratings.logic || 3);
  const [engagement, setEngagement] = useState(existingFeedback?.ratings.engagement || 3);
  const [comments, setComments] = useState(existingFeedback?.comments || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(!!existingFeedback && currentUser.role !== 'evaluator');
  
  const session = getSessionById(sessionId);
  const participant = getUserById(participantId);
  
  if (!session || !participant) {
    return <div>Session or participant not found</div>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Feedback submitted',
        description: 'Your feedback has been saved successfully.',
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>
            {isReadOnly ? 'Feedback Summary' : 'Provide Feedback'}
          </CardTitle>
          <CardDescription>
            {isReadOnly 
              ? `Feedback for ${participant.name} in "${session.title}"`
              : `Evaluate ${participant.name}'s performance in "${session.title}"`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Communication</label>
                <span className="text-sm font-semibold">{communication}/5</span>
              </div>
              <Slider
                value={[communication]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setCommunication(value[0])}
                disabled={isReadOnly}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Clarity of expression, articulation, and organization of thoughts
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Confidence</label>
                <span className="text-sm font-semibold">{confidence}/5</span>
              </div>
              <Slider
                value={[confidence]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setConfidence(value[0])}
                disabled={isReadOnly}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Speaking with conviction, maintaining composure, and handling questions well
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Logic & Reasoning</label>
                <span className="text-sm font-semibold">{logic}/5</span>
              </div>
              <Slider
                value={[logic]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setLogic(value[0])}
                disabled={isReadOnly}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Coherent arguments, critical thinking, and problem-solving approach
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Engagement</label>
                <span className="text-sm font-semibold">{engagement}/5</span>
              </div>
              <Slider
                value={[engagement]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setEngagement(value[0])}
                disabled={isReadOnly}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Active participation, listening to others, and contributing meaningfully
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Comments</label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide constructive feedback and specific suggestions for improvement..."
              rows={5}
              readOnly={isReadOnly}
              className={isReadOnly ? 'bg-muted cursor-default' : ''}
            />
          </div>
        </CardContent>
        {!isReadOnly && (
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
};

export default FeedbackForm;
