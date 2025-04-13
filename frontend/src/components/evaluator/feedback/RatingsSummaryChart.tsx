
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from 'recharts';

interface RatingCategory {
  name: string;
  value: number;
  color: string;
}

interface RatingsSummaryChartProps {
  pieChartData: RatingCategory[];
  averageRatings: {
    communication: number;
    confidence: number;
    reasoning: number;
    engagement: number;
    overall: number;
  };
}

export const RatingsSummaryChart = ({ pieChartData, averageRatings }: RatingsSummaryChartProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Average Ratings
        </CardTitle>
        <CardDescription>
          Overall session performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 10).toFixed(1)}`}
                labelLine={false}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Overall Average:</span>
            <span className="text-xl font-bold">{averageRatings.overall}/10</span>
          </div>
          <Separator className="my-2" />
          <div className="space-y-2 mt-3">
            {pieChartData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-sm">{category.name}:</span>
                </div>
                <span className="font-medium">{category.value}/10</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
