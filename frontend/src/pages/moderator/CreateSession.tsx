
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, Users, Plus, X, Sparkles } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from "sonner";
import { Switch } from '@/components/ui/switch';

// Mock user data for participants selection
const availableUsers = [
  { id: '1', name: 'Jane Participant', email: 'jane@example.com', role: 'participant' },
  { id: '2', name: 'John Smith', email: 'john@example.com', role: 'participant' },
  { id: '3', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'participant' },
  { id: '4', name: 'Mike Brown', email: 'mike@example.com', role: 'participant' },
  { id: '5', name: 'Alex Evaluator', email: 'alex@example.com', role: 'evaluator' },
  { id: '6', name: 'Emily Davis', email: 'emily@example.com', role: 'participant' },
  { id: '7', name: 'David Wilson', email: 'david@example.com', role: 'participant' },
];

// Sample AI-generated topics
const aiSuggestedTopics = [
  "The Impact of Artificial Intelligence on Future Employment",
  "Sustainable Business Practices in a Global Economy",
  "Remote Work Culture: Benefits and Challenges",
  "Digital Privacy in the Age of Big Data",
  "Leadership Strategies for Diverse Teams",
  "The Future of Cryptocurrency and Digital Finance",
  "Ethical Considerations in Modern Marketing",
  "Work-Life Balance in a Connected World",
  "Innovation Strategies for Competitive Advantage",
  "Crisis Management and Business Continuity"
];

const CreateSession = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('60');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState<string>('');
  const [useVoiceChat, setUseVoiceChat] = useState(false);
  const [recordSession, setRecordSession] = useState(false);
  const [showTopicGenerator, setShowTopicGenerator] = useState(false);

  const handleParticipantToggle = (userId: string) => {
    if (selectedParticipants.includes(userId)) {
      setSelectedParticipants(selectedParticipants.filter(id => id !== userId));
    } else {
      setSelectedParticipants([...selectedParticipants, userId]);
    }
  };

  const handleSelectEvaluator = (userId: string) => {
    setSelectedEvaluator(userId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title) {
      toast.error("Please enter a session title");
      return;
    }
    
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    if (!time) {
      toast.error("Please select a time");
      return;
    }
    
    if (selectedParticipants.length === 0) {
      toast.error("Please select at least one participant");
      return;
    }
    
    if (!selectedEvaluator) {
      toast.error("Please select an evaluator");
      return;
    }
    
    // In a real app, this would send a request to create a session
    toast.success("Session created successfully");
    navigate('/moderator/sessions');
  };

  const generateTopic = () => {
    // In a real app, this would call an AI API to generate a topic
    // For demo, we'll select a random topic from our predefined list
    const randomIndex = Math.floor(Math.random() * aiSuggestedTopics.length);
    setTitle(aiSuggestedTopics[randomIndex]);
    setShowTopicGenerator(false);
    toast.success("AI topic generated!");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Session</h1>
          <p className="text-gray-500">Set up a new group discussion or interview session</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>
                Set the basic information for your session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="title">Session Topic/Title</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTopicGenerator(!showTopicGenerator)}
                    className="text-speakspace-primary"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {showTopicGenerator ? 'Hide Suggestions' : 'AI Topic Generator'}
                  </Button>
                </div>
                <Input
                  id="title"
                  placeholder="E.g., Corporate Leadership Strategies"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {showTopicGenerator && (
                <div className="bg-speakspace-primary/5 p-4 rounded-md space-y-3">
                  <h4 className="font-medium flex items-center text-speakspace-primary">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI-Suggested Topics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {aiSuggestedTopics.slice(0, 6).map((topic, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left hover:bg-speakspace-primary/10 hover:text-speakspace-primary"
                        onClick={() => setTitle(topic)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      onClick={generateTopic}
                      className="bg-speakspace-primary/20 text-speakspace-primary hover:bg-speakspace-primary/30"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate New Topic
                    </Button>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the session..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="time"
                      type="time"
                      className="pl-10"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
              <CardDescription>
                Select participants and an evaluator for the session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Participants</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Select users who will participate in the discussion
                  </p>
                  <div className="border rounded-md divide-y">
                    {availableUsers
                      .filter(user => user.role === 'participant')
                      .map(user => (
                        <div 
                          key={user.id} 
                          className="flex items-center justify-between p-3 hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-speakspace-participant/20 flex items-center justify-center">
                                <Users className="h-5 w-5 text-speakspace-participant" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant={selectedParticipants.includes(user.id) ? "default" : "outline"}
                            className={selectedParticipants.includes(user.id) ? "bg-speakspace-primary" : ""}
                            onClick={() => handleParticipantToggle(user.id)}
                          >
                            {selectedParticipants.includes(user.id) ? (
                              <>
                                <X className="mr-2 h-4 w-4" />
                                Remove
                              </>
                            ) : (
                              <>
                                <Plus className="mr-2 h-4 w-4" />
                                Add
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                  </div>
                  {selectedParticipants.length > 0 && (
                    <p className="text-sm mt-2">
                      <span className="font-medium">{selectedParticipants.length}</span> participants selected
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-base">Evaluator</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Select an evaluator to provide feedback after the session
                  </p>
                  <div className="border rounded-md divide-y">
                    {availableUsers
                      .filter(user => user.role === 'evaluator')
                      .map(user => (
                        <div 
                          key={user.id} 
                          className="flex items-center justify-between p-3 hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-speakspace-evaluator/20 flex items-center justify-center">
                                <Users className="h-5 w-5 text-speakspace-evaluator" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant={selectedEvaluator === user.id ? "default" : "outline"}
                            className={selectedEvaluator === user.id ? "bg-speakspace-evaluator" : ""}
                            onClick={() => handleSelectEvaluator(user.id)}
                          >
                            {selectedEvaluator === user.id ? "Selected" : "Select"}
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Options</CardTitle>
              <CardDescription>
                Configure additional options for the session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Voice Chat</Label>
                  <p className="text-sm text-gray-500">
                    Allow participants to communicate with voice in addition to text
                  </p>
                </div>
                <Switch
                  checked={useVoiceChat}
                  onCheckedChange={setUseVoiceChat}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Record Session</Label>
                  <p className="text-sm text-gray-500">
                    Save a transcript of the session for later review
                  </p>
                </div>
                <Switch
                  checked={recordSession}
                  onCheckedChange={setRecordSession}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/moderator/sessions')}
              >
                Cancel
              </Button>
              <Button type="submit" className="btn-moderator">
                Create Session
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateSession;
