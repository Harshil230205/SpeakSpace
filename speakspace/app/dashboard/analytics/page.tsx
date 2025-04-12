"use client"

import { useAuth } from "@/components/auth-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartLine,
  ChartBar,
  ChartArea,
} from "@/components/ui/chart"
import {
  BarChart,
  LineChart,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
  Area,
} from "recharts"

export default function AnalyticsPage() {
  const { user } = useAuth()

  // Mock data for performance metrics
  const performanceData = [
    {
      name: "Jan",
      communication: 6.5,
      confidence: 5.8,
      logic: 7.2,
      engagement: 6.0,
    },
    {
      name: "Feb",
      communication: 7.0,
      confidence: 6.2,
      logic: 7.5,
      engagement: 6.5,
    },
    {
      name: "Mar",
      communication: 7.2,
      confidence: 6.8,
      logic: 7.8,
      engagement: 7.0,
    },
    {
      name: "Apr",
      communication: 7.8,
      confidence: 7.2,
      logic: 8.0,
      engagement: 7.5,
    },
    {
      name: "May",
      communication: 8.0,
      confidence: 7.5,
      logic: 8.2,
      engagement: 7.8,
    },
    {
      name: "Jun",
      communication: 8.5,
      confidence: 8.0,
      logic: 8.5,
      engagement: 8.2,
    },
  ]

  // Mock data for session participation
  const sessionData = [
    { name: "Week 1", sessions: 2, duration: 120 },
    { name: "Week 2", sessions: 3, duration: 180 },
    { name: "Week 3", sessions: 1, duration: 60 },
    { name: "Week 4", sessions: 4, duration: 240 },
    { name: "Week 5", sessions: 2, duration: 150 },
    { name: "Week 6", sessions: 3, duration: 210 },
  ]

  // Mock data for skill comparison
  const skillComparisonData = [
    {
      category: "Communication",
      you: 8.5,
      average: 7.2,
    },
    {
      category: "Confidence",
      you: 8.0,
      average: 6.8,
    },
    {
      category: "Logic/Reasoning",
      you: 8.5,
      average: 7.5,
    },
    {
      category: "Engagement",
      you: 8.2,
      average: 7.0,
    },
  ]

  return (
    <DashboardSidebar>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your performance and improvement over time</p>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="participation">Participation</TabsTrigger>
            <TabsTrigger value="comparison">Skill Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Your performance scores over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Chart>
                    <ChartContainer>
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                      <ChartLegend>
                        <ChartLegendItem name="Communication" color="#3b82f6" />
                        <ChartLegendItem name="Confidence" color="#10b981" />
                        <ChartLegendItem name="Logic/Reasoning" color="#f59e0b" />
                        <ChartLegendItem name="Engagement" color="#8b5cf6" />
                      </ChartLegend>
                      <ChartGrid />
                      <ChartXAxis dataKey="name" />
                      <ChartYAxis domain={[0, 10]} />
                      <ChartLine dataKey="communication" stroke="#3b82f6" />
                      <ChartLine dataKey="confidence" stroke="#10b981" />
                      <ChartLine dataKey="logic" stroke="#f59e0b" />
                      <ChartLine dataKey="engagement" stroke="#8b5cf6" />
                      <ChartArea dataKey="communication" fill="#3b82f6" fillOpacity={0.1} />
                      <ChartArea dataKey="confidence" fill="#10b981" fillOpacity={0.1} />
                      <ChartArea dataKey="logic" fill="#f59e0b" fillOpacity={0.1} />
                      <ChartArea dataKey="engagement" fill="#8b5cf6" fillOpacity={0.1} />
                    </ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="communication"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.1}
                        />
                        <Area type="monotone" dataKey="confidence" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="logic" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="engagement" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Session Participation</CardTitle>
                <CardDescription>Your session attendance and duration over the past 6 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Chart>
                    <ChartContainer>
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                      <ChartLegend>
                        <ChartLegendItem name="Sessions" color="#3b82f6" />
                        <ChartLegendItem name="Duration (min)" color="#f59e0b" />
                      </ChartLegend>
                      <ChartGrid />
                      <ChartXAxis dataKey="name" />
                      <ChartYAxis yAxisId="left" />
                      <ChartYAxis yAxisId="right" orientation="right" />
                      <ChartBar dataKey="sessions" fill="#3b82f6" yAxisId="left" />
                      <ChartLine dataKey="duration" stroke="#f59e0b" yAxisId="right" />
                    </ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sessionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sessions" fill="#3b82f6" yAxisId="left" />
                        <Line type="monotone" dataKey="duration" stroke="#f59e0b" yAxisId="right" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skill Comparison</CardTitle>
                <CardDescription>Your skills compared to the platform average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Chart>
                    <ChartContainer>
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                      <ChartLegend>
                        <ChartLegendItem name="You" color="#3b82f6" />
                        <ChartLegendItem name="Platform Average" color="#d1d5db" />
                      </ChartLegend>
                      <ChartGrid />
                      <ChartXAxis dataKey="category" />
                      <ChartYAxis domain={[0, 10]} />
                      <ChartBar dataKey="average" fill="#d1d5db" />
                      <ChartBar dataKey="you" fill="#3b82f6" />
                    </ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" fill="#d1d5db" name="Platform Average" />
                        <Bar dataKey="you" fill="#3b82f6" name="You" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardSidebar>
  )
}
