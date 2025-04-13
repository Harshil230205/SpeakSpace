
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  BookOpen, 
  Lightbulb, 
  MessageSquare, 
  Video, 
  Mic, 
  Target, 
  ChevronDown, 
  Play, 
  PlusCircle, 
  Sparkles 
} from 'lucide-react';
import { toast } from 'sonner';

// Mock practice resources data
const interviewQuestions = [
  {
    id: '1',
    category: 'Behavioral',
    question: 'Tell me about a time when you had to work with a difficult team member.',
    difficulty: 'Medium',
    tips: 'Use the STAR method: Situation, Task, Action, Result. Focus on how you handled the conflict professionally.'
  },
  {
    id: '2',
    category: 'Behavioral',
    question: 'Describe a project where you demonstrated leadership skills.',
    difficulty: 'Medium',
    tips: 'Highlight your decision-making process, how you motivated others, and the outcomes achieved.'
  },
  {
    id: '3',
    category: 'Technical',
    question: 'How would you explain a complex technical concept to a non-technical audience?',
    difficulty: 'Hard',
    tips: 'Demonstrate your communication skills by using analogies and avoiding jargon.'
  },
  {
    id: '4',
    category: 'Problem-Solving',
    question: 'Describe a time when you had to make a difficult decision with limited information.',
    difficulty: 'Hard',
    tips: 'Focus on your analytical approach, the factors you considered, and how you evaluated risks.'
  },
  {
    id: '5',
    category: 'Situational',
    question: 'How would you handle a situation where you disagree with your manager\'s decision?',
    difficulty: 'Medium',
    tips: 'Emphasize respectful communication, providing evidence for your perspective, and willingness to support the final decision.'
  }
];

const gdTopics = [
  {
    id: '1',
    title: 'The Impact of Artificial Intelligence on Future Employment',
    category: 'Technology',
    difficulty: 'Medium',
    description: 'Discuss how AI will affect job markets, which sectors will be most impacted, and how workers can adapt.',
    keyPoints: [
      'Current AI capabilities and limitations',
      'Industries most vulnerable to automation',
      'New job opportunities created by AI',
      'Skills that will remain valuable in an AI-driven economy',
      'Ethical considerations in AI deployment'
    ]
  },
  {
    id: '2',
    title: 'Remote Work: The New Normal or Temporary Trend?',
    category: 'Workplace',
    difficulty: 'Easy',
    description: 'Analyze the sustainability of remote work beyond the pandemic and its impacts on company culture and productivity.',
    keyPoints: [
      'Productivity comparisons between remote and office work',
      'Mental health considerations',
      'Company culture in distributed teams',
      'Environmental impacts of reduced commuting',
      'Technology infrastructure requirements'
    ]
  },
  {
    id: '3',
    title: 'Should Higher Education Be Free?',
    category: 'Education',
    difficulty: 'Medium',
    description: 'Debate the economic, social, and political implications of providing free higher education to all citizens.',
    keyPoints: [
      'Economic costs and benefits',
      'Social mobility impacts',
      'Alternative funding models',
      'International comparisons',
      'Quality concerns with free education'
    ]
  },
  {
    id: '4',
    title: 'Ethical Implications of Genetic Engineering',
    category: 'Ethics',
    difficulty: 'Hard',
    description: 'Discuss the moral boundaries of genetic modification technologies like CRISPR and their regulation.',
    keyPoints: [
      'Medical applications vs. enhancement',
      'Consent and future generations',
      'Genetic diversity concerns',
      'Regulatory frameworks',
      'Access equity issues'
    ]
  },
  {
    id: '5',
    title: 'Social Media: Net Positive or Negative for Society?',
    category: 'Social Issues',
    difficulty: 'Easy',
    description: 'Evaluate the overall impact of social media platforms on personal relationships, democracy, and mental health.',
    keyPoints: [
      'Impact on attention spans and mental health',
      'Misinformation and echo chambers',
      'Global connectivity benefits',
      'Privacy concerns',
      'Addiction and screen time'
    ]
  }
];

const learningResources = [
  {
    id: '1',
    title: 'Mastering the STAR Method',
    type: 'Article',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Learn how to structure your interview responses using the Situation, Task, Action, Result framework.',
    link: '#'
  },
  {
    id: '2',
    title: 'Body Language in Interviews',
    type: 'Video',
    icon: <Video className="h-5 w-5" />,
    description: 'Expert tips on how to use positive body language to create a strong first impression.',
    link: '#'
  },
  {
    id: '3',
    title: 'Effective Group Discussion Techniques',
    type: 'Tutorial',
    icon: <MessageSquare className="h-5 w-5" />,
    description: 'Strategies for contributing meaningfully to group discussions while showcasing your leadership skills.',
    link: '#'
  },
  {
    id: '4',
    title: 'Voice Modulation for Impact',
    type: 'Audio',
    icon: <Mic className="h-5 w-5" />,
    description: 'Practice exercises to improve your vocal tone, pace, and emphasis for more engaging communication.',
    link: '#'
  },
  {
    id: '5',
    title: 'Handling Challenging Questions',
    type: 'Interactive Guide',
    icon: <Target className="h-5 w-5" />,
    description: 'Techniques for addressing difficult, unexpected, or critical questions with confidence.',
    link: '#'
  }
];

const Practice = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('interview');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  
  const handleStartPractice = (type: string, id: string) => {
    // In a real app, this would navigate to a practice session
    toast.info(`Started ${type} practice session`);
  };
  
  const handleGenerateAITopic = () => {
    // In a real app, this would call an AI API to generate a new topic
    toast.success("New AI-generated topic added to your list");
  };
  
  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };
  
  const toggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
            <CardFooter>
              <Button onClick={() => navigate('/login')} className="w-full">
                Log in as Participant
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Practice Area</h1>
          <p className="text-muted-foreground">
            Improve your interview and group discussion skills with self-paced practice
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interview" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>Interview Practice</span>
            </TabsTrigger>
            <TabsTrigger value="gd" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Group Discussion</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Learning Resources</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="interview" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Interview Questions</h2>
              <Button variant="outline" size="sm" onClick={() => handleGenerateAITopic()} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Generate AI Questions</span>
              </Button>
            </div>
            
            <div className="space-y-3">
              {interviewQuestions.map((question) => (
                <Card key={question.id} className="transition-all">
                  <Collapsible
                    open={expandedQuestion === question.id}
                    onOpenChange={() => toggleQuestion(question.id)}
                    className="w-full"
                  >
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-primary/10">
                              {question.category}
                            </Badge>
                            <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                          </div>
                          <h3 className="text-base font-medium">{question.question}</h3>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-full p-0 w-8 h-8 flex items-center justify-center">
                            <ChevronDown className={`h-4 w-4 transition-transform ${expandedQuestion === question.id ? 'transform rotate-180' : ''}`} />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </CardHeader>
                    
                    <CollapsibleContent>
                      <CardContent className="p-4 pt-2">
                        <div className="mb-3 p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-2 mb-1">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium">Tips:</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{question.tips}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          onClick={() => handleStartPractice('interview', question.id)} 
                          className="w-full"
                          variant="default"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Practice This Question
                        </Button>
                      </CardFooter>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="gd" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Group Discussion Topics</h2>
              <Button variant="outline" size="sm" onClick={() => handleGenerateAITopic()} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Generate AI Topic</span>
              </Button>
            </div>
            
            <div className="space-y-3">
              {gdTopics.map((topic) => (
                <Card key={topic.id} className="transition-all">
                  <Collapsible
                    open={expandedTopic === topic.id}
                    onOpenChange={() => toggleTopic(topic.id)}
                    className="w-full"
                  >
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-primary/10">
                              {topic.category}
                            </Badge>
                            <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                              {topic.difficulty}
                            </Badge>
                          </div>
                          <h3 className="text-base font-medium">{topic.title}</h3>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-full p-0 w-8 h-8 flex items-center justify-center">
                            <ChevronDown className={`h-4 w-4 transition-transform ${expandedTopic === topic.id ? 'transform rotate-180' : ''}`} />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </CardHeader>
                    
                    <CollapsibleContent>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm mb-3">{topic.description}</p>
                        
                        <div className="mb-3 p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium">Key Points to Consider:</span>
                          </div>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                            {topic.keyPoints.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          onClick={() => handleStartPractice('GD', topic.id)} 
                          className="w-full"
                          variant="default"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Practice This Topic
                        </Button>
                      </CardFooter>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
            
            <Card className="border-dashed border-2 hover:bg-muted/30 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground font-medium">Create Custom Topic</p>
                <p className="text-xs text-muted-foreground mt-1">Add your own group discussion topic</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <h2 className="text-xl font-semibold">Learning Resources</h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {learningResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {resource.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <CardDescription>{resource.type}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <a href={resource.link}>View Resource</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Practice;
