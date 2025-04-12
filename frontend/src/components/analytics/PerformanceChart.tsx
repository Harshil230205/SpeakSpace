
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { feedbacks } from '@/utils/mockData';

interface PerformanceChartProps {
  userId: string;
}

interface ChartData {
  name: string;
  Communication: number;
  Confidence: number;
  'Logic & Reasoning': number;
  Engagement: number;
}

const PerformanceChart = ({ userId }: PerformanceChartProps) => {
  // Get user's feedback ratings
  const userFeedbacks = feedbacks.filter(feedback => feedback.participantId === userId);
  
  if (userFeedbacks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
          <CardDescription>No feedback data available yet</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">
            Participate in sessions to start tracking your performance
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Sort by date (oldest to newest)
  const sortedFeedbacks = [...userFeedbacks].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // Format data for chart
  const chartData: ChartData[] = sortedFeedbacks.map((feedback, index) => {
    const date = new Date(feedback.timestamp);
    const formattedDate = `Session ${index + 1}`;
    
    return {
      name: formattedDate,
      Communication: feedback.ratings.communication,
      Confidence: feedback.ratings.confidence,
      'Logic & Reasoning': feedback.ratings.logic,
      Engagement: feedback.ratings.engagement,
    };
  });
  
  // Calculate average scores
  const calculateAverage = (key: keyof typeof chartData[0]) => {
    if (key === 'name') return 0;
    const sum = chartData.reduce((acc, item) => acc + (item[key] as number), 0);
    return Math.round((sum / chartData.length) * 10) / 10;
  };
  
  const averageScores = {
    Communication: calculateAverage('Communication'),
    Confidence: calculateAverage('Confidence'),
    'Logic & Reasoning': calculateAverage('Logic & Reasoning'),
    Engagement: calculateAverage('Engagement'),
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Over Time</CardTitle>
        <CardDescription>Your skill progression based on feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 5,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Communication" fill="#9b87f5" />
              <Bar dataKey="Confidence" fill="#7E69AB" />
              <Bar dataKey="Logic & Reasoning" fill="#6E59A5" />
              <Bar dataKey="Engagement" fill="#D6BCFA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(averageScores).map(([key, value]) => (
            <div key={key} className="bg-muted p-3 rounded-lg text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{key}</h3>
              <p className="text-xl font-semibold">{value}/5</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
