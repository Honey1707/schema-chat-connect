import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/9a1ede34-4092-44c9-8fd9-f7f85c01e76e.png" 
            alt="DC Data Design" 
            className="h-8 w-auto"
          />
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;