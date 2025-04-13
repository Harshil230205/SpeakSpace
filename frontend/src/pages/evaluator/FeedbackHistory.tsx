
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { SessionInfoHeader } from '@/components/evaluator/feedback/SessionInfoHeader';
import { RatingsSummaryChart } from '@/components/evaluator/feedback/RatingsSummaryChart';
import { ParticipantEvaluationTable } from '@/components/evaluator/feedback/ParticipantEvaluationTable';
import { ParticipantDetailedFeedback } from '@/components/evaluator/feedback/ParticipantDetailedFeedback';
import { SessionNotes } from '@/components/evaluator/feedback/SessionNotes';
import { AccessDeniedCard } from '@/components/evaluator/feedback/AccessDeniedCard';

const mockFeedbackData = {
  sessionId: '3',
  sessionTitle: 'Leadership Skills Assessment',
  sessionTopic: 'Management',
  sessionType: 'Group Discussion',
  date: '2025-04-10T15:00:00',
  duration: 90,
  moderator: {
    name: 'John Moderator',
    id: '1'
  },
  participantCount: 5,
  evaluations: [
    {
      participantId: '2',
      participantName: 'Jane Participant',
      participantImage: 'https://ui-avatars.com/api/?name=Jane+Participant&background=10B981&color=fff',
      ratings: {
        communication: 8.5,
        confidence: 7.5,
        reasoning: 9.0,
        engagement: 8.0,
        overall: 8.3
      },
      notes: 'Jane demonstrated excellent communication skills and logical reasoning. Her arguments were well-structured and she frequently referenced data to support her points.',
      submittedAt: '2025-04-10T16:45:00'
    },
    {
      participantId: '5',
      participantName: 'Michael Smith',
      participantImage: 'https://ui-avatars.com/api/?name=Michael+Smith&background=10B981&color=fff',
      ratings: {
        communication: 7.0,
        confidence: 8.5,
        reasoning: 7.5,
        engagement: 9.0,
        overall: 8.0
      },
      notes: 'Michael showed great enthusiasm and was highly engaged throughout the discussion. He could improve on his communication clarity, but his confidence was notable.',
      submittedAt: '2025-04-10T16:47:00'
    },
    {
      participantId: '6',
      participantName: 'Sarah Johnson',
      participantImage: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff',
      ratings: {
        communication: 9.0,
        confidence: 6.5,
        reasoning: 8.5,
        engagement: 7.0,
        overall: 7.8
      },
      notes: 'Sarah was very articulate and presented well-reasoned arguments. She could work on her confidence and engage more consistently throughout the discussion.',
      submittedAt: '2025-04-10T16:50:00'
    },
    {
      participantId: '7',
      participantName: 'David Brown',
      participantImage: 'https://ui-avatars.com/api/?name=David+Brown&background=10B981&color=fff',
      ratings: {
        communication: 6.5,
        confidence: 7.0,
        reasoning: 8.0,
        engagement: 6.0,
        overall: 6.9
      },
      notes: 'David showed good reasoning skills but should work on his overall engagement and communication clarity. He had some strong points but didn\'t present them confidently.',
      submittedAt: '2025-04-10T16:55:00'
    },
    {
      participantId: '8',
      participantName: 'Emily Wilson',
      participantImage: 'https://ui-avatars.com/api/?name=Emily+Wilson&background=10B981&color=fff',
      ratings: {
        communication: 8.0,
        confidence: 8.0,
        reasoning: 7.0,
        engagement: 7.5,
        overall: 7.6
      },
      notes: 'Emily was well-balanced across all areas. She communicated clearly and showed good confidence. Could improve slightly on the depth of her reasoning.',
      submittedAt: '2025-04-10T17:00:00'
    }
  ],
  sessionNotes: 'Overall, this was a productive group discussion with active participation from most members. The group showed good dynamics, though there were a few instances where more structure would have helped. The topic was explored comprehensively with diverse perspectives shared.'
};

const FeedbackHistory = () => {
  const { sessionId } = useParams();
  const { currentUser } = useAuth();
  const [feedbackData, setFeedbackData] = useState(mockFeedbackData);
  
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
  
  const getAverageRatings = () => {
    const totals = {
      communication: 0,
      confidence: 0,
      reasoning: 0,
      engagement: 0
    };
    
    feedbackData.evaluations.forEach(evaluation => {
      totals.communication += evaluation.ratings.communication;
      totals.confidence += evaluation.ratings.confidence;
      totals.reasoning += evaluation.ratings.reasoning;
      totals.engagement += evaluation.ratings.engagement;
    });
    
    const count = feedbackData.evaluations.length;
    
    return {
      communication: parseFloat((totals.communication / count).toFixed(1)),
      confidence: parseFloat((totals.confidence / count).toFixed(1)),
      reasoning: parseFloat((totals.reasoning / count).toFixed(1)),
      engagement: parseFloat((totals.engagement / count).toFixed(1)),
      overall: parseFloat(((totals.communication + totals.confidence + totals.reasoning + totals.engagement) / (count * 4)).toFixed(1))
    };
  };
  
  const averageRatings = getAverageRatings();
  
  const pieChartData = [
    { name: 'Communication', value: averageRatings.communication, color: '#10B981' },
    { name: 'Confidence', value: averageRatings.confidence, color: '#3B82F6' },
    { name: 'Reasoning', value: averageRatings.reasoning, color: '#8B5CF6' },
    { name: 'Engagement', value: averageRatings.engagement, color: '#F59E0B' }
  ];
  
  if (!currentUser || currentUser.role !== 'evaluator') {
    return (
      <MainLayout>
        <AccessDeniedCard />
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <SessionInfoHeader 
          sessionTitle={feedbackData.sessionTitle}
          sessionType={feedbackData.sessionType}
          sessionTopic={feedbackData.sessionTopic}
          date={feedbackData.date}
          duration={feedbackData.duration}
          moderatorName={feedbackData.moderator.name}
          participantCount={feedbackData.participantCount}
          formatDate={formatDate}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RatingsSummaryChart 
            pieChartData={pieChartData}
            averageRatings={averageRatings}
          />
          
          <ParticipantEvaluationTable 
            evaluations={feedbackData.evaluations}
          />
        </div>
        
        <ParticipantDetailedFeedback 
          evaluations={feedbackData.evaluations}
          formatDate={formatDate}
        />
        
        <SessionNotes 
          notes={feedbackData.sessionNotes}
        />
      </div>
    </MainLayout>
  );
};

export default FeedbackHistory;
