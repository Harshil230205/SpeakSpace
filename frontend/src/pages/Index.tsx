
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquare, Users, BarChart3, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
        <div className="container px-4 py-16 md:py-24 mx-auto flex flex-col lg:flex-row items-center">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Elevate Your <span className="underline decoration-4 decoration-white/50">Interview Skills</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto lg:mx-0">
              Practice, receive feedback, and improve your group discussion and
              interview performance in a collaborative environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={() => navigate('/dashboard')} className="bg-white text-purple-700 hover:bg-purple-50">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-purple-700 hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 mt-12 lg:mt-0">
            <AuthForm />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Master Essential Skills for Success</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Discussions</h3>
              <p className="text-gray-600">
                Participate in live group discussions and interviews with peers and mentors.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based System</h3>
              <p className="text-gray-600">
                Join as a participant, moderator, or evaluator and experience different perspectives.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Feedback</h3>
              <p className="text-gray-600">
                Receive structured feedback on communication, confidence, logic, and engagement.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your improvement over time with visual analytics and performance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="italic text-gray-600 mb-4">
                "SpeakSpace helped me prepare for my interviews and significantly improved my confidence. The feedback I received was invaluable."
              </p>
              <p className="font-semibold">Alex T., Software Engineer</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="italic text-gray-600 mb-4">
                "As a moderator, I've seen participants transform their communication skills and tackle interviews with ease. Amazing platform!"
              </p>
              <p className="font-semibold">Jamie R., Career Coach</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="italic text-gray-600 mb-4">
                "The analytics dashboard helped me identify my weak points and focus my efforts on the areas that needed improvement."
              </p>
              <p className="font-semibold">Sam L., MBA Graduate</p>
            </div>
          </div>
          
          <Button className="mt-10" size="lg">
            Join Our Community
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center mr-2">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">SpeakSpace</span>
              </div>
              <p className="text-gray-400 mt-2">Improve your communication skills</p>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <div>
                <h3 className="font-semibold mb-3">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Tips & Tricks</a></li>
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 SpeakSpace. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
