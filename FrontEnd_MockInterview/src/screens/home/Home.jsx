import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Navbar } from "./componentsHome/Navbar";
import Footer from "./componentsHome/Footer";
import { Button } from "@/components/ui/button";
import { AppContent } from "@/context/Appcontext";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Star } from "lucide-react";
import {
  Brain,
  ListChecks,
  LineChart,
  ArrowUpRight,
  Zap,
  Clock,
  BarChart3,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Loader from "./componentsHome/Loader";

const HeroSection = () => {
  const { isLoggedIn } = useContext(AppContent);
  return (
    <section className="w-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      <div className="container mx-auto px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col space-y-6 text-white">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium mb-2">
              <span className="mr-1">✨</span> AI-Powered Interview Practice
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Ace Your Interviews with{" "}
              <span className="text-blue-400">SkillMate AI</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-xl">
              Prepare for your next job interview with our innovative mock
              interview platform. Get personalized AI-generated feedback to
              enhance your performance and boost your confidence.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Realistic interview scenarios",
                "Instant personalized feedback",
                "Track your progress",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md px-8 py-6 shadow-lg shadow-blue-600/20 transition-all"
              >
                <Link to={isLoggedIn ? "dashboard" : "login"}>
                  Start Your Mock Interview
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <p className="text-sm text-slate-400 mt-3">
                No credit card required • Free to get started
              </p>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-full h-full bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
            <div className="relative z-10 w-full max-w-lg">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 text-slate-400 text-sm">
                      Mock Interview Session
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-slate-700 rounded-lg p-3 text-slate-200 text-sm">
                      Tell me about a challenging project you worked on and how
                      you overcame obstacles.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                      You
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-300 text-sm">
                      In my previous role, I led a team that was tasked with...
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="animate-pulse flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-blue-500" />,
      title: "AI-Powered Feedback",
      description:
        "Get real-time, intelligent feedback on your interview responses with our advanced AI analysis.",
      tag: "Smart Analysis",
    },
    {
      icon: <ListChecks className="h-10 w-10 text-blue-500" />,
      title: "Wide Range of Questions",
      description:
        "Practice with diverse questions across industries and job roles, tailored to your specific needs.",
      tag: "Comprehensive",
    },
    {
      icon: <LineChart className="h-10 w-10 text-blue-500" />,
      title: "Personalized Insights",
      description:
        "Receive customized improvement suggestions based on your performance and speaking patterns.",
      tag: "Tailored Growth",
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: "Instant Evaluation",
      description:
        "No waiting for feedback - get immediate analysis after each practice session.",
      tag: "Real-time",
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      title: "Progress Tracking",
      description:
        "Monitor your improvement over time with detailed performance metrics and analytics.",
      tag: "Analytics",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
      title: "Industry Benchmarks",
      description:
        "Compare your performance against industry standards and successful candidates.",
      tag: "Competitive Edge",
    },
  ];

  return (
    <section className="w-full py-24 bg-slate-50">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 bg-white border-blue-200 text-blue-700"
          >
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Everything you need to ace your interviews
          </h2>
          <p className="text-lg text-slate-600">
            Our platform combines cutting-edge AI technology with proven
            interview techniques to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="flex flex-wrap justify-between items-center">
                <div className="mb-5 inline-flex p-2 rounded-lg bg-blue-50">
                  {feature.icon}
                </div>
                <Badge
                  variant="secondary"
                  className="mb-3 min-w-fit w-[40%] p-2 bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  {feature.tag}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-800"
              >
                Learn more <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "SkillMate AI transformed my interview preparation. The personalized feedback helped me identify weaknesses I wasn't aware of, and I landed my dream job at a tech giant!",
      name: "John Doe",
      title: "Software Engineer at TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "The AI feedback was precise and incredibly helpful. After just two weeks of practice, I felt so much more confident in my interviews. Highly recommended!",
      name: "Jane Smith",
      title: "Marketing Manager at CreativeInc",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "As someone who gets nervous during interviews, this platform was a game-changer. The realistic scenarios helped me overcome my anxiety and perform better.",
      name: "Michael Johnson",
      title: "Data Analyst at AnalyticsPro",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
    {
      quote:
        "I was skeptical about AI feedback at first, but I'm amazed by how accurate and helpful it was. Worth every penny for my career advancement.",
      name: "Sarah Williams",
      title: "Product Manager at InnovateCo",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-blue-100 opacity-60"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-blue-50 opacity-60"></div>
        <div className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full bg-slate-100 opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-600">
            Join thousands of job seekers who have improved their interview
            skills with SkillMate AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-slate-200" />
                ))}
              </div>

              <blockquote className="text-slate-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-100"
                />
                <div>
                  <cite className="block font-semibold text-slate-900 not-italic">
                    {testimonial.name}
                  </cite>
                  <span className="text-sm text-slate-600">
                    {testimonial.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
          >
            Read more testimonials <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const CallToActionSection = () => {
  const benefits = [
    "Unlimited practice interviews",
    "Personalized feedback and insights",
    "Industry-specific question banks",
    "Performance analytics and tracking",
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 inline-flex items-center mb-6 mx-auto">
            <div className="bg-white/20 rounded-lg px-3 py-1 text-white text-sm font-medium mr-2">
              Limited Time
            </div>
            <span className="text-white/90 text-sm pr-2">
              Get 30% off your first 3 months
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
            Ready to Ace Your Next Interview?
          </h2>

          <p className="text-xl text-blue-100 text-center mb-10 max-w-3xl mx-auto">
            Join thousands of successful job seekers who have transformed their
            interview skills and landed their dream jobs.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-200 mr-3 flex-shrink-0" />
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 font-medium rounded-md px-8 py-6 shadow-lg shadow-blue-800/20 transition-all"
            >
              <Link to="signup">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-black hover:bg-white/10 hover:text-white font-medium rounded-md px-8 py-6"
            >
              <Link to="/demo">Watch Demo</Link>
            </Button>
          </div>

          <p className="text-blue-100 text-center mt-6">
            No credit card required • Free 7-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const { isLoggedIn } = useContext(AppContent);
  const [login, setLogin] = useState(null); // Start with `null` to indicate "loading"
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      setLogin(isLoggedIn);
      if (isLoggedIn) {
        navigate("/dashboard");
      }
    }
  }, [isLoggedIn, navigate]);

  if (login === null) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      {login ? (
        <Outlet />
      ) : (
        <>
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <CallToActionSection />
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
