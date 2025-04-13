
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText } from 'lucide-react';

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

interface ParticipantEvaluationTableProps {
  evaluations: Evaluation[];
}

export const ParticipantEvaluationTable = ({ evaluations }: ParticipantEvaluationTableProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Participant Evaluations
        </CardTitle>
        <CardDescription>
          Individual feedback provided to each participant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participant</TableHead>
              <TableHead className="text-center">Overall</TableHead>
              <TableHead className="hidden md:table-cell text-center">Communication</TableHead>
              <TableHead className="hidden md:table-cell text-center">Confidence</TableHead>
              <TableHead className="hidden lg:table-cell text-center">Reasoning</TableHead>
              <TableHead className="hidden lg:table-cell text-center">Engagement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evaluations.map((evaluation) => (
              <TableRow key={evaluation.participantId}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img 
                      src={evaluation.participantImage}
                      alt={evaluation.participantName}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="font-medium">{evaluation.participantName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center font-semibold">{evaluation.ratings.overall}</TableCell>
                <TableCell className="hidden md:table-cell text-center">{evaluation.ratings.communication}</TableCell>
                <TableCell className="hidden md:table-cell text-center">{evaluation.ratings.confidence}</TableCell>
                <TableCell className="hidden lg:table-cell text-center">{evaluation.ratings.reasoning}</TableCell>
                <TableCell className="hidden lg:table-cell text-center">{evaluation.ratings.engagement}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
