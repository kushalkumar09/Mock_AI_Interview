import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Tech Corp",
      content: "InterviewAce helped me identify my weak points and practice until I was confident. I landed my dream job at a top tech company!",
      rating: 5,
      avatar: "👩‍💻"
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager", 
      company: "Innovation Inc",
      content: "The AI feedback was incredibly detailed and actionable. I improved my communication skills significantly in just two weeks.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Brand Studio",
      content: "The industry-specific questions were spot on. I felt completely prepared for my interview and got the promotion I wanted.",
      rating: 5,
      avatar: "👩‍🎨"
    }
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their interview skills and landed their dream jobs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-soft transition-all duration-200 border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.content}"
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-12 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-foreground">10,000+</span>
              <span>Users helped</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-foreground">94%</span>
              <span>Success rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;