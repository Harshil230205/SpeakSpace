
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SessionCard from '@/components/sessions/SessionCard';
import CreateSessionModal from '@/components/sessions/CreateSessionModal';
import { currentUser, sessions } from '@/utils/mockData';
import { Search } from 'lucide-react';

const Sessions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter sessions based on user role and involvement
  const userSessions = sessions.filter(session => 
    session.participants.includes(currentUser.id) || 
    session.evaluators.includes(currentUser.id) || 
    session.createdBy === currentUser.id
  );
  
  const upcomingSessions = userSessions.filter(session => session.status === 'upcoming');
  const activeSessions = userSessions.filter(session => session.status === 'active');
  const completedSessions = userSessions.filter(session => session.status === 'completed');
  
  // Filter based on search query
  const filterSessions = (sessionsList: typeof sessions) => {
    if (!searchQuery.trim()) return sessionsList;
    
    const query = searchQuery.toLowerCase();
    return sessionsList.filter(session => 
      session.title.toLowerCase().includes(query) || 
      session.description.toLowerCase().includes(query) || 
      session.topic.toLowerCase().includes(query)
    );
  };
  
  const filteredUpcoming = filterSessions(upcomingSessions);
  const filteredActive = filterSessions(activeSessions);
  const filteredCompleted = filterSessions(completedSessions);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Sessions</h1>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sessions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {currentUser.role === 'moderator' && <CreateSessionModal />}
          </div>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex gap-2">
              Active
              {activeSessions.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                  {activeSessions.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="pt-4">
            {filteredActive.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredActive.map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'No active sessions match your search' : 'No active sessions at the moment'}
                  </p>
                  {currentUser.role === 'moderator' && !searchQuery && (
                    <CreateSessionModal />
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="pt-4">
            {filteredUpcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUpcoming.map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'No upcoming sessions match your search' : 'No upcoming sessions scheduled'}
                  </p>
                  {currentUser.role === 'moderator' && !searchQuery && (
                    <CreateSessionModal />
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="pt-4">
            {filteredCompleted.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCompleted.map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No completed sessions match your search' : 'No completed sessions yet'}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
