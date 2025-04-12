
import { Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Session, getUserById } from '@/utils/mockData';
import { Link } from 'react-router-dom';

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const moderator = getUserById(session.createdBy);
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{session.title}</CardTitle>
          <Badge
            variant={
              session.status === 'active' 
                ? 'default' 
                : session.status === 'upcoming' 
                ? 'secondary' 
                : 'outline'
            }
          >
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{session.description}</p>
          
          <div className="text-sm text-gray-700 font-medium">
            Topic: <span className="text-primary">{session.topic}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formattedTime}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {session.participants.length} Participants · {session.evaluators.length} Evaluator{session.evaluators.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Link to={`/discussion?sessionId=${session.id}`} className="w-full">
            <Button variant={session.status === 'active' ? 'default' : 'outline'} className="w-full">
              {session.status === 'active' ? 'Join Discussion' : 
               session.status === 'upcoming' ? 'View Details' : 'View Summary'}
            </Button>
          </Link>
          {session.status === 'completed' && (
            <Link to={`/feedback?sessionId=${session.id}`} className="w-full">
              <Button variant="secondary" className="w-full">
                View Feedback
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SessionCard;
