import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import Navigation from "@/components/Navigation";
import RegistrationForm from "@/components/RegistrationForm";
import Invoice from "@/components/Invoice";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const [user, setUser] = useState<any>(null);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, [navigate]);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        setUser(JSON.parse(userStr));
      } else {
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/auth");
  };

  const handleRegistrationComplete = (data: any) => {
    setRegistrationData(data);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Register for the Golf Day</h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.email}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>

        {!registrationData ? (
          <RegistrationForm onRegistrationComplete={handleRegistrationComplete} />
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-600 mb-2">
                Registration Complete!
              </h2>
              <p className="text-muted-foreground">
                Your registration has been processed and an invoice has been sent to your email.
              </p>
            </div>
            <Invoice registration={registrationData} />
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setRegistrationData(null)}
              >
                Register Another Person
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;