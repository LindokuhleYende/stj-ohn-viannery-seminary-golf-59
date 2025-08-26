import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sponsors = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Partners & Beneficiaries</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are grateful to our sponsors who make this event possible and proud to support these worthy beneficiaries
          </p>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Thank You To Our Sponsors</h2>
          
          <div className="relative">
            <div className="flex items-center justify-center">
              <button className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-12">
                {/* The Brand Pot */}
                <Card className="p-8 shadow-elegant hover:shadow-glow transition-shadow">
                  <CardContent className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">TBP</span>
                      </div>
                      <h3 className="font-semibold text-sm">The Brand Pot</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Investec */}
                <Card className="p-8 shadow-elegant hover:shadow-glow transition-shadow">
                  <CardContent className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-primary">Investec</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Urban Espresso */}
                <Card className="p-8 shadow-elegant hover:shadow-glow transition-shadow">
                  <CardContent className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-accent rounded-full"></div>
                      <h3 className="font-semibold text-sm">Urban Espresso</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* The Brand Pot (Second) */}
                <Card className="p-8 shadow-elegant hover:shadow-glow transition-shadow">
                  <CardContent className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">TBP</span>
                      </div>
                      <h3 className="font-semibold text-sm">The Brand Pot</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <button className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>
            
            {/* Carousel indicator */}
            <div className="flex justify-center mt-6">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiaries Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">List Of Our Beneficiaries</h2>
          
          <div className="relative">
            <div className="flex items-center justify-center">
              <button className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-12">
                {/* OR TAMBO GOLF ACADEMY */}
                <Card className="shadow-elegant hover:shadow-glow transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-accent text-white p-6 text-center">
                    <h3 className="text-lg font-bold mb-2">OR TAMBO</h3>
                    <h4 className="text-lg font-bold">GOLF ACADEMY</h4>
                    <p className="text-sm mt-2 opacity-90">Changing Lives Through Golf</p>
                  </div>
                </Card>

                {/* Finding The Fair Way */}
                <Card className="shadow-elegant hover:shadow-glow transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded mr-2"></div>
                      <div className="w-8 h-8 bg-white/20 rounded"></div>
                    </div>
                    <h3 className="text-lg font-bold">Finding The</h3>
                    <h4 className="text-lg font-bold">Fair Way</h4>
                  </div>
                </Card>

                {/* OR TAMBO GOLF ACADEMY (Second) */}
                <Card className="shadow-elegant hover:shadow-glow transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-accent text-white p-6 text-center">
                    <h3 className="text-lg font-bold mb-2">OR TAMBO</h3>
                    <h4 className="text-lg font-bold">GOLF ACADEMY</h4>
                    <p className="text-sm mt-2 opacity-90">Changing Lives Through Golf</p>
                  </div>
                </Card>

                {/* Finding The Fair Way (Second) */}
                <Card className="shadow-elegant hover:shadow-glow transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded mr-2"></div>
                      <div className="w-8 h-8 bg-white/20 rounded"></div>
                    </div>
                    <h3 className="text-lg font-bold">Finding The</h3>
                    <h4 className="text-lg font-bold">Fair Way</h4>
                  </div>
                </Card>
              </div>
              
              <button className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>
            
            {/* Carousel indicator */}
            <div className="flex justify-center mt-6">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Partner</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join us in making a difference. Contact us to learn about sponsorship opportunities and how you can support these amazing causes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@ortambogolf.co.za" className="inline-block">
              <Card className="p-6 hover:shadow-glow transition-shadow cursor-pointer">
                <CardContent>
                  <h3 className="font-semibold mb-2">Sponsorship Enquiries</h3>
                  <p className="text-muted-foreground">info@ortambogolf.co.za</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;