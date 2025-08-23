import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Choose Your Role",
      description: "Select your target position and industry. Our AI customizes questions based on your specific field and experience level.",
      icon: "🎯"
    },
    {
      step: "02", 
      title: "Practice Interview",
      description: "Engage in realistic mock interviews with our AI interviewer. Answer questions naturally while our system analyzes your performance.",
      icon: "💬"
    },
    {
      step: "03",
      title: "Get Detailed Feedback",
      description: "Receive comprehensive analysis including speech patterns, confidence levels, and specific areas for improvement.",
      icon: "📊"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in just three simple steps and start improving your interview skills immediately.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center group hover:shadow-soft transition-all duration-200 border-border/50">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl opacity-80">{step.icon}</span>
                  </div>
                  <Badge variant="outline" className="mx-auto mb-3 w-fit text-xs border-border/50">
                    Step {step.step}
                  </Badge>
                  <CardTitle className="text-lg">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;