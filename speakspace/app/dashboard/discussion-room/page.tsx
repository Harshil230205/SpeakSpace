"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mic, MicOff, Send, Timer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Message = {
  id: string
  sender: string
  role: string
  content: string
  timestamp: Date
}

type Participant = {
  id: string
  name: string
  role: string
  isActive: boolean
  speakingTime: number
}

export default function DiscussionRoomPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isMicActive, setIsMicActive] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [isSessionActive, setIsSessionActive] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data for participants
  useEffect(() => {
    setParticipants([
      {
        id: "user-1",
        name: "John Doe",
        role: "participant",
        isActive: true,
        speakingTime: 120,
      },
      {
        id: "user-2",
        name: "Jane Smith",
        role: "participant",
        isActive: true,
        speakingTime: 85,
      },
      {
        id: "user-3",
        name: "Alex Johnson",
        role: "moderator",
        isActive: true,
        speakingTime: 210,
      },
      {
        id: "user-4",
        name: "Sarah Williams",
        role: "evaluator",
        isActive: true,
        speakingTime: 45,
      },
    ])

    // Mock initial messages
    setMessages([
      {
        id: "msg-1",
        sender: "Alex Johnson",
        role: "moderator",
        content:
          "Welcome everyone to our discussion on Technical Interview Preparation. Let's start by introducing ourselves.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "msg-2",
        sender: "John Doe",
        role: "participant",
        content: "Hi everyone, I'm John. I'm preparing for software engineering interviews.",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "msg-3",
        sender: "Jane Smith",
        role: "participant",
        content: "Hello! I'm Jane, currently looking for data science roles.",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
      {
        id: "msg-4",
        sender: "Sarah Williams",
        role: "evaluator",
        content: "Hi all, I'm Sarah. I'll be evaluating today's discussion and providing feedback at the end.",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
      },
      {
        id: "msg-5",
        sender: "Alex Johnson",
        role: "moderator",
        content:
          "Great! Let's start with our first question: What are the most important skills for technical interviews?",
        timestamp: new Date(Date.now() - 1000 * 60 * 1),
      },
    ])

    // Session timer
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: user?.name || "Anonymous",
      role: user?.role || "participant",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")
  }

  const toggleMic = () => {
    setIsMicActive(!isMicActive)
    toast({
      title: isMicActive ? "Microphone disabled" : "Microphone enabled",
      description: isMicActive ? "You are now muted" : "You can now speak",
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <DashboardSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discussion Room</h1>
            <p className="text-muted-foreground">Technical Interview Preparation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-muted-foreground" />
              <span className="font-mono text-lg">{formatTime(sessionTime)}</span>
            </div>
            <Badge variant={isSessionActive ? "default" : "outline"}>{isSessionActive ? "Active" : "Ended"}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="md:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle>Discussion</CardTitle>
              <CardDescription>Share your thoughts and ideas with the group</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(70vh-13rem)] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{msg.sender}</span>
                        <Badge variant="outline" className="text-xs">
                          {msg.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatMessageTime(msg.timestamp)}</span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Button type="button" size="icon" variant={isMicActive ? "default" : "outline"} onClick={toggleMic}>
                  {isMicActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Participants</CardTitle>
              <CardDescription>{participants.length} people in this session</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="active" className="flex-1">
                    Active
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 space-y-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{participant.name}</div>
                          <div className="text-xs text-muted-foreground">{participant.role}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.floor(participant.speakingTime / 60)}m {participant.speakingTime % 60}s
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="active" className="mt-4 space-y-4">
                  {participants
                    .filter((p) => p.isActive)
                    .map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{participant.name}</div>
                            <div className="text-xs text-muted-foreground">{participant.role}</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.floor(participant.speakingTime / 60)}m {participant.speakingTime % 60}s
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            {user?.role === "evaluator" && (
              <>
                <Separator />
                <CardFooter className="pt-4">
                  <Button className="w-full">Provide Feedback</Button>
                </CardFooter>
              </>
            )}
            {user?.role === "moderator" && (
              <>
                <Separator />
                <CardFooter className="pt-4">
                  <Button className="w-full" variant="destructive">
                    End Session
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </div>
    </DashboardSidebar>
  )
}
