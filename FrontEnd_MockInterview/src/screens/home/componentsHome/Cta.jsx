import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <Card className="relative overflow-hidden bg-foreground text-background border-border/50">
          <CardContent className="py-16 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their interview skills. 
              Start your free trial today and experience the difference AI coaching can make.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={()=>(navigate("login"))} variant="outline" size="lg" className="text-base px-8 py-3 bg-background text-foreground border-background/20 hover:bg-background/90">
                Start Free Trial
              </Button>
              <Button variant="ghost" size="lg" className="text-base px-8 py-3 text-background/80 hover:bg-background/10">
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;