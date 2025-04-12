
// Types
export type UserRole = 'moderator' | 'participant' | 'evaluator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  topic: string;
  duration: number; // in minutes
  scheduledFor: string; // ISO date string
  status: 'upcoming' | 'active' | 'completed';
  createdBy: string; // moderator ID
  participants: string[]; // user IDs
  evaluators: string[]; // user IDs
}

export interface Message {
  id: string;
  sessionId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string; // ISO date string
}

export interface Feedback {
  id: string;
  sessionId: string;
  participantId: string;
  evaluatorId: string;
  ratings: {
    communication: number;
    confidence: number;
    logic: number;
    engagement: number;
  };
  comments: string;
  timestamp: string; // ISO date string
}

// Mock Data
export const currentUser: User = {
  id: 'user-1',
  name: 'Harshil Kachhadiya',
  email: 'harshil23kachhadiya@gmail.com',
  role: 'moderator',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=9b87f5&color=fff'
};

export const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=Jamie+Smith&background=7E69AB&color=fff'
  },
  {
    id: 'user-3',
    name: 'Taylor Brown',
    email: 'taylor@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=Taylor+Brown&background=6E59A5&color=fff'
  },
  {
    id: 'user-4',
    name: 'Morgan Lee',
    email: 'morgan@example.com',
    role: 'evaluator',
    avatar: 'https://ui-avatars.com/api/?name=Morgan+Lee&background=9b87f5&color=fff'
  },
  {
    id: 'user-5',
    name: 'Sam Wilson',
    email: 'sam@example.com',
    role: 'participant',
    avatar: 'https://ui-avatars.com/api/?name=Sam+Wilson&background=7E69AB&color=fff'
  }
];

export const sessions: Session[] = [
  {
    id: 'session-1',
    title: 'Technical Interview Practice',
    description: 'Practice for technical software engineering interviews',
    topic: 'System Design: Chat Application',
    duration: 60,
    scheduledFor: '2025-04-15T10:00:00Z',
    status: 'upcoming',
    createdBy: 'user-1',
    participants: ['user-2', 'user-3', 'user-5'],
    evaluators: ['user-4']
  },
  {
    id: 'session-2',
    title: 'Group Discussion: Climate Change',
    description: 'Practice group discussion on environmental topics',
    topic: 'Renewable Energy Solutions',
    duration: 45,
    scheduledFor: '2025-04-14T14:30:00Z',
    status: 'upcoming',
    createdBy: 'user-1',
    participants: ['user-2', 'user-3', 'user-5'],
    evaluators: ['user-4']
  },
  {
    id: 'session-3',
    title: 'Mock HR Interview',
    description: 'Practice for HR rounds in job interviews',
    topic: 'Leadership and Team Management',
    duration: 30,
    scheduledFor: '2025-04-10T09:00:00Z',
    status: 'completed',
    createdBy: 'user-1',
    participants: ['user-2', 'user-5'],
    evaluators: ['user-4']
  }
];

export const messages: Message[] = [
  {
    id: 'msg-1',
    sessionId: 'session-3',
    senderId: 'user-1',
    senderName: 'Alex Johnson',
    senderRole: 'moderator',
    content: 'Welcome to the mock HR interview session! Let\'s start by discussing a time when you demonstrated leadership skills.',
    timestamp: '2025-04-10T09:01:00Z'
  },
  {
    id: 'msg-2',
    sessionId: 'session-3',
    senderId: 'user-2',
    senderName: 'Jamie Smith',
    senderRole: 'participant',
    content: 'Thank you! In my previous role, I led a team of 5 developers on a critical project. We faced tight deadlines, but I implemented daily standups and a clear task prioritization system that helped us deliver on time.',
    timestamp: '2025-04-10T09:02:30Z'
  },
  {
    id: 'msg-3',
    sessionId: 'session-3',
    senderId: 'user-1',
    senderName: 'Alex Johnson',
    senderRole: 'moderator',
    content: 'Great! How did you handle conflicts within your team?',
    timestamp: '2025-04-10T09:04:00Z'
  },
  {
    id: 'msg-4',
    sessionId: 'session-3',
    senderId: 'user-5',
    senderName: 'Sam Wilson',
    senderRole: 'participant',
    content: 'I believe in addressing conflicts early through direct communication. In one instance, two team members had different approaches to a problem. I facilitated a meeting where both could present their ideas, and we collectively decided on the best approach.',
    timestamp: '2025-04-10T09:05:30Z'
  }
];

export const feedbacks: Feedback[] = [
  {
    id: 'feedback-1',
    sessionId: 'session-3',
    participantId: 'user-2',
    evaluatorId: 'user-4',
    ratings: {
      communication: 4,
      confidence: 4,
      logic: 5,
      engagement: 4
    },
    comments: 'Excellent communication skills. Your response was structured and easy to follow. Consider providing more specific examples to strengthen your answers.',
    timestamp: '2025-04-10T09:45:00Z'
  },
  {
    id: 'feedback-2',
    sessionId: 'session-3',
    participantId: 'user-5',
    evaluatorId: 'user-4',
    ratings: {
      communication: 4,
      confidence: 3,
      logic: 4,
      engagement: 5
    },
    comments: 'Good job explaining your conflict resolution approach. Work on projecting more confidence in your responses. Your engagement level was excellent.',
    timestamp: '2025-04-10T09:50:00Z'
  }
];

// Helper functions for mock data interaction
export const getSessionById = (id: string): Session | undefined => {
  return sessions.find(session => session.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getSessionMessages = (sessionId: string): Message[] => {
  return messages.filter(message => message.sessionId === sessionId);
};

export const getFeedbacksForSession = (sessionId: string): Feedback[] => {
  return feedbacks.filter(feedback => feedback.sessionId === sessionId);
};

export const getFeedbacksForUser = (userId: string): Feedback[] => {
  return feedbacks.filter(feedback => feedback.participantId === userId);
};

// Topics for GD sessions
export const discussionTopics = [
  "Is remote work the future of employment?",
  "Should artificial intelligence be regulated?",
  "Are cryptocurrencies a viable alternative to traditional banking?",
  "Is social media helping or harming society?",
  "Should higher education be free for all?",
  "Is universal basic income a solution to poverty?",
  "Should there be limits on free speech online?",
  "Are smart cities the solution to urban problems?",
  "Should voting be mandatory?",
  "Is space exploration worth the cost?",
  "Should autonomous vehicles be allowed on public roads?",
  "Is globalization beneficial for developing countries?",
  "Should there be a four-day work week?",
  "Are video games beneficial or harmful to child development?"
];

// Interview tips for chatbot
export const interviewTips = [
  "Research the company thoroughly before your interview.",
  "Practice the STAR method (Situation, Task, Action, Result) for behavioral questions.",
  "Prepare questions to ask your interviewer - it shows engagement.",
  "Dress professionally, even for virtual interviews.",
  "Follow up with a thank-you email after your interview.",
  "Arrive 10-15 minutes early for in-person interviews.",
  "Practice good posture and maintain eye contact.",
  "Quantify your achievements with numbers when possible.",
  "Be prepared to discuss salary expectations."
];

// Communication improvement tips
export const communicationTips = [
  "Practice active listening - focus on understanding, not just responding.",
  "Use the 'yes, and' technique from improv to build on others' ideas.",
  "Eliminate filler words like 'um' and 'like' through practice.",
  "Adjust your speaking pace - not too fast, not too slow.",
  "Use concrete examples to illustrate your points.",
  "Be aware of your body language and what it communicates.",
  "Ask clarifying questions when you don't understand something.",
  "Summarize key points to show you're engaged.",
  "Practice speaking on camera to improve your virtual presence."
];

// Helper function to generate a random tip
export const getRandomTip = (tipType: 'interview' | 'communication'): string => {
  const tips = tipType === 'interview' ? interviewTips : communicationTips;
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
};
