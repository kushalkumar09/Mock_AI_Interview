import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-interview.jpg";
import { useContext } from "react";
import { AppContent } from "@/context/Appcontext";
import { useNavigate } from "react-router";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const { isLoggedIn } = useContext(AppContent);
  const navigate = useNavigate();
  const handleStartPractice = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } })

    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 1 },
    ).fromTo(
        ".hero-title",
        { opacity: 0, y: 60, rotationX: 45 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.2 },
        "-=0.3",
      )

      .fromTo(".hero-description", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")

      .fromTo(
        ".hero-buttons",
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
        "-=0.2",
      )

      .fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.8, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "power3.out" },
        "-=0.8",
      )

    gsap.to(".hero-image", {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2,
    })
  })
  return (
    <section className="relative py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left space-y-8">
            <Badge variant="outline" className="hero-badge mb-2 text-muted-foreground border-border/50">
              AI-Powered Interview Preparation
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="hero-title block">Master Your Next</span>
              <span className="hero-title block text-foreground/80">Job Interview</span>
            </h1>

            <p className="hero-description text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Practice with AI-powered mock interviews, get detailed feedback, and boost your confidence. Prepare for
              any role with personalized coaching and real-time analysis.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={handleStartPractice} size="lg" className="text-base px-8 py-3">
                {isLoggedIn ? "Go to Dashboard" : "Start Practice Now"}
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 py-3 border-border/50 bg-transparent">
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-soft border border-border/50">
              <img
                src={heroImage} 
                alt="Professional conducting an AI mock interview"
                className="hero-image w-full h-auto object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;