
import { ArrowLeft, Calendar, Clock, User, MessageSquare, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface SessionInfoHeaderProps {
  sessionTitle: string;
  sessionType: string;
  sessionTopic: string;
  date: string;
  duration: number;
  moderatorName: string;
  participantCount: number;
  formatDate: (dateString: string) => string;
}

export const SessionInfoHeader = ({
  sessionTitle,
  sessionType,
  sessionTopic,
  date,
  duration,
  moderatorName,
  participantCount,
  formatDate,
}: SessionInfoHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const exportFeedback = () => {
    console.log('Exporting feedback');
    toast({
      title: "Success",
      description: "Feedback exported successfully",
    });
  };
  
  return (
    <>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/evaluator/sessions')} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sessions</span>
        </Button>
        
        <Button onClick={exportFeedback} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Feedback
        </Button>
      </div>
      
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Feedback History: {sessionTitle}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{sessionType}</Badge>
          <span className="text-muted-foreground">
            Topic: {sessionTopic}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{duration} minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>Moderator: {moderatorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span>Participants: {participantCount}</span>
        </div>
      </div>
    </>
  );
};
