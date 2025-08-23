import { Button } from "@/components/ui/button";
import { AppContent } from "@/context/Appcontext";
import { useToast } from "@/hooks/use-toast";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const { setIsLoggedIn } = useContext(AppContent);
  const { toast } = useToast();
  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast({
      title: "Success!",
      description: "Logged out successfully",
    });
  };

  return (
    <header className="w-full border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={login ? "dashboard" : "/"} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-foreground rounded-md flex items-center justify-center">
              <span className="text-background font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold text-foreground">SkillMate</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button onClick={()=>(navigate("/login"))} variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button onClick={()=>(navigate("/signup"))}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;