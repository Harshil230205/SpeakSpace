
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { StrictMode } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ModeratorSessions from "./pages/moderator/ModeratorSessions";
import CreateSession from "./pages/moderator/CreateSession";
import SessionRoom from "./pages/moderator/SessionRoom";
import ManageParticipants from "./pages/moderator/ManageParticipants";
import EditParticipant from "./pages/moderator/EditParticipant";
import SessionSummary from "./pages/moderator/SessionSummary";
import ParticipantSessions from "./pages/participant/ParticipantSessions";
import ParticipantSessionRoom from "./pages/participant/SessionRoom";
import SessionFeedback from "./pages/participant/SessionFeedback";
import Practice from "./pages/participant/Practice";
import EvaluatorSessions from "./pages/evaluator/EvaluatorSessions";
import EvaluationRoom from "./pages/evaluator/EvaluationRoom";
import FeedbackHistory from "./pages/evaluator/FeedbackHistory";
import EvaluationForm from "./pages/evaluator/EvaluationForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Moderator Routes */}
              <Route path="/moderator/sessions" element={<ModeratorSessions />} />
              <Route path="/moderator/sessions/create" element={<CreateSession />} />
              <Route path="/moderator/sessions/:sessionId/room" element={<SessionRoom />} />
              <Route path="/moderator/sessions/:sessionId/summary" element={<SessionSummary />} />
              <Route path="/moderator/participants" element={<ManageParticipants />} />
              <Route path="/moderator/participants/:participantId/edit" element={<EditParticipant />} />
              
              {/* Participant Routes */}
              <Route path="/participant/sessions" element={<ParticipantSessions />} />
              <Route path="/participant/sessions/:sessionId/room" element={<ParticipantSessionRoom />} />
              <Route path="/participant/sessions/:sessionId/feedback" element={<SessionFeedback />} />
              <Route path="/participant/practice" element={<Practice />} />
              
              {/* Evaluator Routes */}
              <Route path="/evaluator/sessions" element={<EvaluatorSessions />} />
              <Route path="/evaluator/sessions/:sessionId/room" element={<EvaluationRoom />} />
              <Route path="/evaluator/sessions/:sessionId/feedback-history" element={<FeedbackHistory />} />
              <Route path="/evaluator/sessions/:sessionId/evaluate/:participantId" element={<EvaluationForm />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
