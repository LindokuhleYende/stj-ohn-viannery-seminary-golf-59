import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              About Our Golf Day
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              A day dedicated to bringing our community together while supporting local charities
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What This Day Is About</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our Annual Charity Golf Day brings together local businesses, golf enthusiasts, and 
                community leaders for a day of networking, fun, and most importantly, giving back 
                to those who need it most in our community.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Every swing, every putt, and every laugh shared on the course contributes to making 
                a real difference in the lives of local families and children. This isn't just a 
                golf tournament – it's a celebration of community spirit and collective generosity.
              </p>
              <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <p className="text-lg font-semibold text-primary mb-2">Our Mission</p>
                <p className="text-muted-foreground">
                  To create lasting positive impact in our local community while fostering 
                  meaningful connections between business leaders and community members.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <CardContent className="pt-0">
                  <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">100%</h3>
                  <p className="text-sm text-muted-foreground">Proceeds to Charity</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="pt-0">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">500+</h3>
                  <p className="text-sm text-muted-foreground">Lives Impacted</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="pt-0">
                  <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">R50K</h3>
                  <p className="text-sm text-muted-foreground">Raised Last Year</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="pt-0">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">5</h3>
                  <p className="text-sm text-muted-foreground">Years Running</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Who We Help */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who We Help</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="pt-0">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Local Children's Charities</h3>
                  <p className="text-muted-foreground mb-4">
                    Supporting organizations that provide essential services, education, and care 
                    for disadvantaged children in our community.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• After-school programs</li>
                    <li>• Educational resources</li>
                    <li>• Healthcare support</li>
                    <li>• Youth development initiatives</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Community Food Banks</h3>
                  <p className="text-muted-foreground mb-4">
                    Helping ensure no family in our community goes hungry by supporting local 
                    food distribution networks and emergency assistance programs.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Emergency food assistance</li>
                    <li>• Family meal programs</li>
                    <li>• Senior citizen support</li>
                    <li>• Holiday food drives</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Mental Health Services</h3>
                  <p className="text-muted-foreground mb-4">
                    Contributing to mental health awareness and support services that provide 
                    counseling and resources for community members in need.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Counseling services</li>
                    <li>• Support groups</li>
                    <li>• Crisis intervention</li>
                    <li>• Community workshops</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why It Matters</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Every pound raised, every connection made, and every moment of joy shared during our 
              golf day creates ripple effects throughout our community. When local businesses come 
              together with a shared purpose, we don't just raise funds – we build stronger bonds 
              and create lasting positive change.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Community Impact</h3>
                <p className="text-muted-foreground">
                  Our event strengthens the fabric of our local community by bringing together 
                  diverse groups with a common goal of helping others. The relationships formed 
                  here often lead to year-round collaborations and support.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Sustainable Support</h3>
                <p className="text-muted-foreground">
                  By creating an annual tradition, we provide consistent, reliable funding that 
                  charities can count on. This allows them to plan long-term programs and make 
                  deeper impacts in the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;