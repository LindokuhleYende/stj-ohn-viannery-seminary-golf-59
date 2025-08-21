import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import CountdownTimer from "@/components/CountdownTimer";
import heroImage from "@/assets/golf-hero.jpg";
import { Calendar, MapPin, Users, Heart } from "lucide-react";

const Index = () => {
  // Event date: October 1, 2025
  const eventDate = new Date('2025-10-01T09:00:00');
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/70"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            ST JOHN VIANNEY SEMINARY
            <span className="block text-3xl md:text-4xl font-normal mt-2 text-white/90">
              2ND ANNUAL FUNDRAISING GOLF EVENT
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join us for a day of golf, networking, and fundraising to make a difference in our community
          </p>
          
          {/* Event Details */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Pretoria Country Club</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Limited to 144 Players</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Event Countdown</h2>
            <CountdownTimer targetDate={eventDate.toISOString()} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-elegant">
                Register Now - R150
              </Button>
            </Link>
            <Link to="/donate">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 border-white text-white hover:bg-white/10"
              >
                <Heart className="w-5 h-5 mr-2" />
                Make a Donation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-elegant hover:shadow-glow transition-shadow">
              <CardContent className="pt-6">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Full Day Event</h3>
                <p className="text-muted-foreground">
                  Registration at 8:00 AM, tee-off at 9:00 AM, followed by dinner and awards ceremony
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-elegant hover:shadow-glow transition-shadow">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Supporting Local Community</h3>
                <p className="text-muted-foreground">
                  Supporting St John's Church ministries and local community programs
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-elegant hover:shadow-glow transition-shadow">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Networking & Fellowship</h3>
                <p className="text-muted-foreground">
                  Connect with fellow church members and local community while supporting a great cause
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Endorsement Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Endorsed by St John's Church</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            This charity golf day is proudly supported by St John's Church community, 
            bringing together faith, fellowship, and fundraising for local causes.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto shadow-elegant">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
            <p className="text-muted-foreground">
              Every registration and donation directly supports our church's community outreach programs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
