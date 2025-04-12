"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    newFeedback: true,
    newMessages: true,
    marketingEmails: false,
  })
  const [audioSettings, setAudioSettings] = useState({
    autoMute: false,
    noiseReduction: true,
    echoReduction: true,
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    })
  }

  const handleAudioUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Audio settings updated",
      description: "Your audio preferences have been saved.",
    })
  }

  return (
    <DashboardSidebar>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="audio">Audio Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <form onSubmit={handleProfileUpdate}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <RadioGroup defaultValue={user?.role} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="participant" id="participant" disabled />
                        <Label htmlFor="participant">Participant</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderator" id="moderator" disabled />
                        <Label htmlFor="moderator">Moderator</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evaluator" id="evaluator" disabled />
                        <Label htmlFor="evaluator">Evaluator</Label>
                      </div>
                    </RadioGroup>
                    <p className="text-xs text-muted-foreground mt-1">Contact support to change your role</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <form onSubmit={handleNotificationUpdate}>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how and when you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="session-reminders">Session Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive reminders before your scheduled sessions
                        </p>
                      </div>
                      <Switch
                        id="session-reminders"
                        checked={notifications.sessionReminders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sessionReminders: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-feedback">New Feedback</Label>
                        <p className="text-sm text-muted-foreground">Get notified when you receive new feedback</p>
                      </div>
                      <Switch
                        id="new-feedback"
                        checked={notifications.newFeedback}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, newFeedback: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-messages">New Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new messages in your sessions
                        </p>
                      </div>
                      <Switch
                        id="new-messages"
                        checked={notifications.newMessages}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, newMessages: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new features and promotions
                        </p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Preferences</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="audio">
            <Card>
              <form onSubmit={handleAudioUpdate}>
                <CardHeader>
                  <CardTitle>Audio Settings</CardTitle>
                  <CardDescription>Configure your microphone and audio preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-mute">Auto-Mute on Join</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically mute your microphone when joining a session
                        </p>
                      </div>
                      <Switch
                        id="auto-mute"
                        checked={audioSettings.autoMute}
                        onCheckedChange={(checked) => setAudioSettings({ ...audioSettings, autoMute: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="noise-reduction">Noise Reduction</Label>
                        <p className="text-sm text-muted-foreground">
                          Reduce background noise during voice conversations
                        </p>
                      </div>
                      <Switch
                        id="noise-reduction"
                        checked={audioSettings.noiseReduction}
                        onCheckedChange={(checked) => setAudioSettings({ ...audioSettings, noiseReduction: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="echo-reduction">Echo Reduction</Label>
                        <p className="text-sm text-muted-foreground">Reduce echo during voice conversations</p>
                      </div>
                      <Switch
                        id="echo-reduction"
                        checked={audioSettings.echoReduction}
                        onCheckedChange={(checked) => setAudioSettings({ ...audioSettings, echoReduction: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Audio Settings</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardSidebar>
  )
}
