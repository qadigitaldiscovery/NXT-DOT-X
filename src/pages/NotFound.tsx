
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="bg-dashboard-primary rounded-full h-24 w-24 flex items-center justify-center mx-auto">
          <span className="text-5xl font-bold text-white">404</span>
        </div>
        <h1 className="text-3xl font-bold text-dashboard-heading">Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
