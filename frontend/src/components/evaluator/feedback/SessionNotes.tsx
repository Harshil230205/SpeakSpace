
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface SessionNotesProps {
  notes: string;
}

export const SessionNotes = ({ notes }: SessionNotesProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-elevation transition-all duration-500 hover:shadow-colored-hover animate-float">
      <CardHeader className="bg-gradient-to-r from-speakspace-evaluator/30 via-speakspace-evaluator/20 to-speakspace-evaluator/10 pb-4">
        <div className="flex items-center gap-3 animate-fade-in">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="rounded-full bg-speakspace-evaluator/40 p-3 shadow-md transition-all duration-300 hover:bg-speakspace-evaluator/60 hover:shadow-glow animate-pulse-soft cursor-pointer">
                <MessageSquare className="h-5 w-5 text-speakspace-evaluator" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 animate-fade-in">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Session Notes</h4>
                <p className="text-xs text-muted-foreground">
                  Notes from the evaluator about the overall session performance and dynamics
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
          <div className="animate-slide-in" style={{ animationDelay: '100ms' }}>
            <CardTitle className="text-lg font-medium">Session Notes</CardTitle>
            <CardDescription className="text-sm">
              General notes about the overall session
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-gradient-to-b from-white to-gray-50 transition-all duration-300">
        {notes ? (
          <div className="text-sm leading-relaxed space-y-4">
            {notes.split('\n').map((paragraph, index) => (
              <p 
                key={index} 
                className="transition-all duration-500 animate-slide-in opacity-0"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-muted-foreground animate-pulse-light">No session notes available</p>
        )}
      </CardContent>
    </Card>
  );
};
