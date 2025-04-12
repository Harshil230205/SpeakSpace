"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, Users, Clock } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  const upcomingSessions = [
    {
      id: "1",
      title: "Technical Interview Practice",
      date: "Tomorrow, 3:00 PM",
      participants: 5,
    },
    {
      id: "2",
      title: "Group Discussion: Climate Change",
      date: "Friday, 5:30 PM",
      participants: 8,
    },
  ]

  return (
    <DashboardSidebar>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your SpeakSpace account</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.8/10</div>
              <p className="text-xs text-muted-foreground">+0.3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Join an ongoing session</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled practice sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="text-sm text-muted-foreground">{session.date}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {session.participants}
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                ))}
                {upcomingSessions.length === 0 && (
                  <div className="text-center text-muted-foreground py-4">No upcoming sessions</div>
                )}
                <Button variant="outline" className="w-full mt-2">
                  View All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Feedback from your recent sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Technical Interview Practice</div>
                    <div className="text-sm font-medium">8.5/10</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    "Good technical knowledge, but could improve on explaining complex concepts in simpler terms."
                  </div>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Group Discussion: AI Ethics</div>
                    <div className="text-sm font-medium">7.8/10</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    "Made valid points but could be more assertive in presenting your ideas."
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-2">
                  View All Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardSidebar>
  )
}
