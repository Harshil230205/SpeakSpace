
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Evaluation {
  participantId: string;
  participantName: string;
  participantImage: string;
  ratings: {
    communication: number;
    confidence: number;
    reasoning: number;
    engagement: number;
    overall: number;
  };
  notes: string;
  submittedAt: string;
}

interface ParticipantDetailedFeedbackProps {
  evaluations: Evaluation[];
  formatDate: (dateString: string) => string;
}

export const ParticipantDetailedFeedback = ({ evaluations, formatDate }: ParticipantDetailedFeedbackProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Individual Feedback Notes</CardTitle>
        <CardDescription>
          Detailed feedback provided to each participant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {evaluations.map((evaluation) => (
          <div key={evaluation.participantId} className="p-4 rounded-lg border">
            <div className="flex items-start gap-3 mb-3">
              <img 
                src={evaluation.participantImage}
                alt={evaluation.participantName}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{evaluation.participantName}</h3>
                  <Badge className="bg-speakspace-evaluator text-white">
                    {evaluation.ratings.overall}/10
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Feedback submitted at {formatDate(evaluation.submittedAt)}
                </p>
              </div>
            </div>
            
            <p className="text-sm mb-4">{evaluation.notes}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                <span className="text-xs text-muted-foreground">Communication</span>
                <span className="font-bold">{evaluation.ratings.communication}</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                <span className="text-xs text-muted-foreground">Confidence</span>
                <span className="font-bold">{evaluation.ratings.confidence}</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                <span className="text-xs text-muted-foreground">Reasoning</span>
                <span className="font-bold">{evaluation.ratings.reasoning}</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                <span className="text-xs text-muted-foreground">Engagement</span>
                <span className="font-bold">{evaluation.ratings.engagement}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
