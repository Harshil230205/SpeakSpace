"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Plus, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SessionsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [sessionTitle, setSessionTitle] = useState("")
  const [sessionDescription, setSessionDescription] = useState("")
  const [sessionDate, setSessionDate] = useState("")
  const [sessionTime, setSessionTime] = useState("")
  const [sessionDuration, setSessionDuration] = useState("60")

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Session created",
      description: "Your session has been scheduled successfully.",
    })
    setOpen(false)
    // Reset form
    setSessionTitle("")
    setSessionDescription("")
    setSessionDate("")
    setSessionTime("")
    setSessionDuration("60")
  }

  const upcomingSessions = [
    {
      id: "1",
      title: "Technical Interview Practice",
      description: "Practice answering common technical interview questions",
      date: "2023-06-15",
      time: "15:00",
      duration: 60,
      participants: 5,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Group Discussion: Climate Change",
      description: "Discuss the impacts of climate change and potential solutions",
      date: "2023-06-17",
      time: "17:30",
      duration: 90,
      participants: 8,
      status: "upcoming",
    },
  ]

  const pastSessions = [
    {
      id: "3",
      title: "Mock HR Interview",
      description: "Practice answering behavioral questions",
      date: "2023-06-10",
      time: "14:00",
      duration: 45,
      participants: 2,
      status: "completed",
    },
    {
      id: "4",
      title: "Group Discussion: AI Ethics",
      description: "Discuss ethical considerations in AI development",
      date: "2023-06-08",
      time: "16:00",
      duration: 60,
      participants: 6,
      status: "completed",
    },
  ]

  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(`${dateStr}T${timeStr}`)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <DashboardSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
            <p className="text-muted-foreground">Manage your practice sessions and discussions</p>
          </div>
          {user?.role === "moderator" && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Session
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <form onSubmit={handleCreateSession}>
                  <DialogHeader>
                    <DialogTitle>Create New Session</DialogTitle>
                    <DialogDescription>Set up a new practice session or group discussion</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Session Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Technical Interview Practice"
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the session and its objectives"
                        value={sessionDescription}
                        onChange={(e) => setSessionDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={sessionDate}
                          onChange={(e) => setSessionDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={sessionTime}
                          onChange={(e) => setSessionTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="15"
                        max="180"
                        step="15"
                        value={sessionDuration}
                        onChange={(e) => setSessionDuration(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Session</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            {user?.role === "moderator" && <TabsTrigger value="created">Created by Me</TabsTrigger>}
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatDate(session.date, session.time)}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {session.duration} minutes
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          {session.participants} participants
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Session</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-center text-muted-foreground">No upcoming sessions found</p>
                  {user?.role === "moderator" && (
                    <Button variant="outline" className="mt-4" onClick={() => setOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create a Session
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            {pastSessions.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {pastSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatDate(session.date, session.time)}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {session.duration} minutes
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          {session.participants} participants
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Feedback
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-10">
                  <p className="text-center text-muted-foreground">No past sessions found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          {user?.role === "moderator" && (
            <TabsContent value="created" className="space-y-4">
              <Card>
                <CardContent className="flex items-center justify-center py-10">
                  <p className="text-center text-muted-foreground">You haven't created any sessions yet</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardSidebar>
  )
}
