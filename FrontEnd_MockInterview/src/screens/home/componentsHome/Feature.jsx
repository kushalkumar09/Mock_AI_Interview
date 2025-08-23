import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your speech patterns, body language, and responses to provide detailed feedback.",
      icon: "🤖",
      badge: "Core Feature"
    },
    {
      title: "Industry-Specific Questions",
      description: "Practice with questions tailored to your specific industry and role requirements.",
      icon: "🎯",
      badge: "Personalized"
    },
    {
      title: "Real-time Feedback",
      description: "Get instant feedback on your performance, including speaking pace, confidence, and clarity.",
      icon: "⚡",
      badge: "Instant"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your improvement over time with detailed analytics and performance metrics.",
      icon: "📊",
      badge: "Analytics"
    },
    {
      title: "Video Recording",
      description: "Review your interview sessions with high-quality video playback and annotations.",
      icon: "📹",
      badge: "Premium"
    },
    {
      title: "Expert Tips",
      description: "Access curated tips and strategies from hiring managers and interview experts.",
      icon: "💡",
      badge: "Guidance"
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform combines cutting-edge AI technology with proven interview preparation techniques.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-soft transition-all duration-200 border-border/50 bg-card/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl opacity-80">{feature.icon}</span>
                  <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-foreground transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;