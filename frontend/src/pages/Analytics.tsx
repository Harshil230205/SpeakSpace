
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { currentUser, feedbacks, sessions } from '@/utils/mockData';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';

// Sample data for analytics
const skillData = [
  { name: 'Communication', value: 4.2 },
  { name: 'Confidence', value: 3.8 },
  { name: 'Logic & Reasoning', value: 4.5 },
  { name: 'Engagement', value: 4.0 },
];

const sessionTypeData = [
  { name: 'Technical Interview', value: 8 },
  { name: 'HR Interview', value: 5 },
  { name: 'Group Discussion', value: 12 },
  { name: 'Case Study', value: 3 },
];

const participationData = [
  { name: 'Jan', sessions: 2 },
  { name: 'Feb', sessions: 3 },
  { name: 'Mar', sessions: 1 },
  { name: 'Apr', sessions: 5 },
  { name: 'May', sessions: 4 },
  { name: 'Jun', sessions: 6 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('all');
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sessions Completed</CardTitle>
              <CardDescription>Total sessions you've participated in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Rating</CardTitle>
              <CardDescription>Your overall performance rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.2 <span className="text-lg font-normal text-muted-foreground">/5</span></div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Improvement</CardTitle>
              <CardDescription>Overall skill progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-500">+18%</div>
            </CardContent>
          </Card>
        </div>
        
        <PerformanceChart userId={currentUser.id} />
        
        <Tabs defaultValue="skills">
          <TabsList className="mb-4">
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Skills Breakdown
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Session Types
            </TabsTrigger>
            <TabsTrigger value="participation" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              Participation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills Analysis</CardTitle>
                <CardDescription>
                  Breakdown of your scores across different skill areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Rating" fill="#9b87f5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Session Type Distribution</CardTitle>
                <CardDescription>
                  Types of sessions you've participated in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sessionTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sessionTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="participation">
            <Card>
              <CardHeader>
                <CardTitle>Participation Frequency</CardTitle>
                <CardDescription>
                  Your session participation over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={participationData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sessions"
                        name="Sessions"
                        stroke="#9b87f5"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
