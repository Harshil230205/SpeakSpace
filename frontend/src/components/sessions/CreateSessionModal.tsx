
import { useState } from 'react';
import { CalendarIcon, Clock, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { format, set } from 'date-fns';
import { cn } from '@/lib/utils';
import { discussionTopics, users } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const CreateSessionModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [participants, setParticipants] = useState<string[]>([]);
  const [evaluators, setEvaluators] = useState<string[]>([]);
  const [useTopic, setUseTopic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call to create session
    setTimeout(() => {
      toast({
        title: 'Session created',
        description: 'Your session has been scheduled successfully.',
      });
      setOpen(false);
      resetForm();
    }, 1000);
  };

  const getRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * discussionTopics.length);
    setTopic(discussionTopics[randomIndex]);
    setUseTopic(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTopic('');
    setCustomTopic('');
    setDate(undefined);
    setTime('');
    setDuration('60');
    setParticipants([]);
    setEvaluators([]);
    setUseTopic(false);
  };

  const availableParticipants = users.filter(user => 
    user.role === 'participant' && !participants.includes(user.id)
  );

  const availableEvaluators = users.filter(user => 
    user.role === 'evaluator' && !evaluators.includes(user.id)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Session</DialogTitle>
            <DialogDescription>
              Set up a new group discussion or interview practice session
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Session Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Technical Interview Practice"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this session"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="topic">Discussion Topic</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={getRandomTopic}
                  className="h-8 px-2"
                >
                  <RefreshCw className="h-4 w-4 mr-1" /> 
                  Random Topic
                </Button>
              </div>
              {useTopic ? (
                <div className="flex gap-2">
                  <Input
                    value={topic}
                    readOnly
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setUseTopic(false)}
                    className="h-10"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <Select onValueChange={(value) => {
                    if (value === 'custom') {
                      setTopic(customTopic);
                    } else {
                      setTopic(value);
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {discussionTopics.map((topic, index) => (
                        <SelectItem key={index} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom Topic</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {topic === customTopic && (
                    <Input
                      placeholder="Enter custom topic"
                      value={customTopic}
                      onChange={(e) => {
                        setCustomTopic(e.target.value);
                        setTopic(e.target.value);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
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
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Participants</Label>
              <Select
                onValueChange={(value) => {
                  if (!participants.includes(value)) {
                    setParticipants([...participants, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add participants" />
                </SelectTrigger>
                <SelectContent>
                  {availableParticipants.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {participants.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {participants.map((participantId) => {
                    const participant = users.find(u => u.id === participantId);
                    return participant ? (
                      <Badge key={participantId} variant="secondary" className="flex items-center gap-1">
                        {participant.name}
                        <button
                          type="button"
                          onClick={() => setParticipants(participants.filter(id => id !== participantId))}
                          className="text-xs ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Evaluators</Label>
              <Select
                onValueChange={(value) => {
                  if (!evaluators.includes(value)) {
                    setEvaluators([...evaluators, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add evaluators" />
                </SelectTrigger>
                <SelectContent>
                  {availableEvaluators.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {evaluators.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {evaluators.map((evaluatorId) => {
                    const evaluator = users.find(u => u.id === evaluatorId);
                    return evaluator ? (
                      <Badge key={evaluatorId} variant="secondary" className="flex items-center gap-1">
                        {evaluator.name}
                        <button
                          type="button"
                          onClick={() => setEvaluators(evaluators.filter(id => id !== evaluatorId))}
                          className="text-xs ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionModal;
