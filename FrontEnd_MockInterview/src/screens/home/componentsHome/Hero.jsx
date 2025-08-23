import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-interview.jpg";
import { useContext } from "react";
import { AppContent } from "@/context/Appcontext";
import { useNavigate } from "react-router";

const Hero = () => {
  const { isLoggedIn } = useContext(AppContent);
  const navigate = useNavigate();
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left space-y-8">
            <Badge variant="outline" className="mb-2 text-muted-foreground border-border/50">
              AI-Powered Interview Preparation
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Master Your Next
              <span className="block text-foreground/80">Job Interview</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Practice with AI-powered mock interviews, get detailed feedback, and boost your confidence. 
              Prepare for any role with personalized coaching and real-time analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={()=>(isLoggedIn?navigate("dashboard"):navigate("login"))}  size="lg" className="text-base px-8 py-3">
                Start Practice Now
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 py-3 border-border/50">
                Watch Demo
              </Button>
            </div>
            
          </div>
          
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-soft border border-border/50">
              <img 
                src={heroImage} 
                alt="Professional conducting an AI mock interview" 
                className="w-full h-auto object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;