
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Calendar, MessageSquare, Award, Activity, Users } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout requireAuth={false}>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-speakspace-primary/10 px-3 py-1 text-sm text-speakspace-primary">
                Improve Your Communication Skills
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Master Group Discussions & Ace Your Interviews
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join SpeakSpace to practice and improve your communication skills in a collaborative environment. Get real-time feedback, track your progress, and become a confident communicator.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="btn-primary">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="btn-primary">
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] aspect-video rounded-xl object-cover shadow-xl lg:ml-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Group Discussion Session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">How SpeakSpace Helps You</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our platform offers everything you need to develop and refine your communication skills for group discussions and interviews.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-speakspace-primary/10 p-3 mb-4">
                <Users className="h-6 w-6 text-speakspace-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Role-Based Practice</h3>
              <p className="text-gray-500">
                Join sessions as a moderator, participant, or evaluator to experience different perspectives.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-speakspace-primary/10 p-3 mb-4">
                <MessageSquare className="h-6 w-6 text-speakspace-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Collaboration</h3>
              <p className="text-gray-500">
                Participate in live discussions with text chat and optional voice support.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-speakspace-primary/10 p-3 mb-4">
                <Award className="h-6 w-6 text-speakspace-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Detailed Feedback</h3>
              <p className="text-gray-500">
                Receive specific ratings and comments on your communication, confidence, and reasoning.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-speakspace-primary/10 p-3 mb-4">
                <Calendar className="h-6 w-6 text-speakspace-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-500">
                Create or join sessions that fit your schedule and focus on specific topics.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-speakspace-primary/10 p-3 mb-4">
                <Activity className="h-6 w-6 text-speakspace-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-gray-500">
                Monitor your improvement over time with visual analytics and historical data.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-speakspace-primary/10 p-3 mb-4">
                <Calendar className="h-6 w-6 text-speakspace-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Topic Diversity</h3>
              <p className="text-gray-500">
                Practice with a wide range of discussion topics and interview questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Get started with SpeakSpace in just a few simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative">
              <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-gray-200 hidden md:block"></div>
              <div className="relative flex items-start group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-speakspace-primary text-white z-10">
                  1
                </div>
                <div className="ml-6 pb-8">
                  <h3 className="text-xl font-bold">Create an Account</h3>
                  <p className="mt-2 text-gray-500">
                    Sign up as a moderator, participant, or evaluator based on your goals.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-gray-200 hidden md:block"></div>
              <div className="relative flex items-start group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-speakspace-primary text-white z-10">
                  2
                </div>
                <div className="ml-6 pb-8">
                  <h3 className="text-xl font-bold">Join or Create Sessions</h3>
                  <p className="mt-2 text-gray-500">
                    Participate in existing discussions or create your own practice sessions.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative flex items-start group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-speakspace-primary text-white z-10">
                  3
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold">Improve & Track Progress</h3>
                  <p className="mt-2 text-gray-500">
                    Receive feedback, review your performance, and watch your skills grow over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-speakspace-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Improve Your Communication Skills?
            </h2>
            <p className="max-w-[700px] text-gray-200 md:text-xl">
              Join SpeakSpace today and start your journey to becoming a confident communicator.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="default" className="bg-white text-speakspace-primary hover:bg-gray-100">
                <Link to="/register">Sign Up Now</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
