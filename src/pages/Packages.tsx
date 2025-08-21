import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, Star, Crown, Trophy, Diamond } from "lucide-react";

const Packages = () => {
  const golfPackages = [
    {
      name: "Non-golfer Dinner" ,
      price: "R300",
      icon: <Trophy className="w-8 h-8" />,
      popular: false,
      features: [
        "Welcome breakfast",
        "Gala Dinner",
        "Prize giving ceremony",
        "Three-course dinner",
        "Networking opportunities"
      ]
    },
    {
      name: "Fourball",
      price: "R5500",
      icon: <Star className="w-8 h-8" />,
      popular: true,
      features: [
        "4 players included",
        "Team photo session",
        "Priority tee time",
        "Welcome breakfast for all",
        "Golf carts for team",
        "Prize giving ceremony",
        "Three-course dinner for all",
        "Team commemorative gifts",
        "Gala Dinner",
        "Networking opportunities"
      ]
    }
  ];

  const sponsorshipPackages = [
    {
      name: "Bronze Sponsor",
      price: "R4000 - R7000",
      icon: <Badge className="w-8 h-8" />,
      description: "Sponsor a hole and get your company noticed",
      features: [
        "Company signage on tee",
        "Logo in event program",
        "Social media recognition",
        "Digital certificate"
      ]
    },
    {
      name: "Silver Sponsor",
      price: "R10 000",
      icon: <Trophy className="w-8 h-8" />,
      description: "Great visibility for small to medium businesses",
      features: [
        "Everything in Hole Sponsor",
        "Logo on welcome banner",
        "Mention in opening speech",
        "4 raffle tickets",
        "Priority hole selection"
      ]
    },
    {
      name: "Gold Sponsor",
      price: "R14 500",
      icon: <Star className="w-8 h-8" />,
      description: "Enhanced recognition and networking opportunities",
      popular: true,
      features: [
        "Everything in Bronze",
        "Sponsor a prize category",
        "Logo on dinner menu",
        "Table at networking lunch",
        "10 raffle tickets",
        "Company profile in program"
      ]
    },
    {
      name: "Diamond Sponsor",
      price: "R20 000",
      icon: <Diamond className="w-8 h-8" />,
      description: "Premium sponsorship with maximum exposure",
      features: [
        "Everything in Silver",
        "Logo on event t-shirts",
        "Speaking opportunity",
        "VIP parking space",
        "Premium table at dinner",
        "20 raffle tickets",
        "Year-round website recognition"
      ]
    },
    {
      name: "Platinum Sponsor",
      price: "R30 000",
      icon: <Crown className="w-8 h-8" />,
      description: "Premium sponsorship with maximum exposure",
      features: [
        "Everything in Diamond",
        "Logo on event t-shirts",
        "Speaking opportunity",
        "VIP parking space",
        "Premium table at dinner",
        "20 raffle tickets",
        "Year-round website recognition"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Golf & Sponsorship Packages
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Choose the perfect package for you or your business
            </p>
          </div>
        </div>
      </section>

      {/* Golf Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Golf Packages</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {golfPackages.map((pkg) => (
              <Card key={pkg.name} className={`relative p-6 ${pkg.popular ? 'ring-2 ring-primary shadow-glow' : 'shadow-elegant'}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4 text-primary">
                    {pkg.icon}
                  </div>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary">{pkg.price}</div>
                  <p className="text-muted-foreground">per {pkg.name.toLowerCase().includes('individual') ? 'person' : 'team'}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="block">
                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      Register Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Packages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Sponsorship Opportunities</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Partner with us to gain valuable exposure while supporting local charities. 
            All sponsorship proceeds go directly to charity.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipPackages.map((pkg) => (
              <Card key={pkg.name} className={`p-6 ${pkg.popular ? 'ring-2 ring-primary shadow-glow' : 'shadow-elegant'} hover:shadow-glow transition-shadow`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                    Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4 text-primary">
                    {pkg.icon}
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="block">
                    <Button className="w-full" variant="outline">
                      Become a Sponsor
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're playing or sponsoring, you're making a difference in our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Register to Play
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Inquire About Sponsorship
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;