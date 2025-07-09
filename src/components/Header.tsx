import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">DC</div>
          <div className="text-xl font-light text-foreground">data design</div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isHomePage ? 'text-primary' : 'text-muted-foreground'}`}>
            Home
          </Link>
          <Link to="/upload" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/upload' ? 'text-primary' : 'text-muted-foreground'}`}>
            Upload Schema
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/upload">
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