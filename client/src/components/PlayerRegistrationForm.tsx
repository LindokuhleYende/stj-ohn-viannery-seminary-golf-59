import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const playerSchema = z.object({
  player_name: z.string().min(2, "Player name must be at least 2 characters"),
  player_email: z.string().email().optional().or(z.literal("")),
  tshirt_size: z.string().min(1, "Please select a T-shirt size"),
  dietary_requirements: z.string().optional(),
  attending_gala_dinner: z.boolean()
});

const formSchema = z.object({
  contact_first_name: z.string().min(2, "First name must be at least 2 characters"),
  contact_last_name: z.string().min(2, "Last name must be at least 2 characters"),
  contact_email: z.string().email("Invalid email address"),
  contact_phone: z.string().optional(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  packageId: z.string().min(1, "Please select a package"),
  players: z.array(playerSchema).min(1, "At least one player is required")
});

interface Package {
  id: string;
  name: string;
  description: string | null;
  price: string;
  created_at: string;
}

interface PlayerRegistrationFormProps {
  onRegistrationComplete: (registrationData: any) => void;
}

const PlayerRegistrationForm = ({ onRegistrationComplete }: PlayerRegistrationFormProps) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_first_name: "",
      contact_last_name: "",
      contact_email: "",
      contact_phone: "",
      company_name: "",
      company_address: "",
      packageId: "",
      players: []
    },
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await api.getPackages();
      setPackages(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load packages",
        variant: "destructive",
      });
    }
  };

  const getPlayerCount = (packageName: string): number => {
    if (packageName.toLowerCase().includes('fourball') || packageName.toLowerCase().includes('four ball')) {
      return 4;
    } else if (packageName.toLowerCase().includes('threeball') || packageName.toLowerCase().includes('three ball')) {
      return 3;
    } else if (packageName.toLowerCase().includes('twoball') || packageName.toLowerCase().includes('two ball')) {
      return 2;
    } else if (packageName.toLowerCase().includes('oneball') || packageName.toLowerCase().includes('one ball')) {
      return 1;
    } else if (packageName.toLowerCase().includes('non-golfer')) {
      return 1; // For dinner attendance
    } else if (packageName.toLowerCase().includes('bronze')) {
      return 4;
    } else if (packageName.toLowerCase().includes('silver')) {
      return 4;
    } else if (packageName.toLowerCase().includes('gold')) {
      return 8;
    } else if (packageName.toLowerCase().includes('platinum')) {
      return 12;
    }
    return 1;
  };

  const handlePackageChange = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    setSelectedPackage(pkg || null);
    form.setValue("packageId", packageId);
    
    if (pkg) {
      const playerCount = getPlayerCount(pkg.name);
      const players = Array.from({ length: playerCount }, () => ({
        player_name: "",
        player_email: "",
        tshirt_size: "",
        dietary_requirements: "",
        attending_gala_dinner: false
      }));
      form.setValue("players", players);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        toast({
          title: "Error",
          description: "You must be logged in to register",
          variant: "destructive",
        });
        return;
      }

      const user = JSON.parse(userStr);
      const selectedPkg = packages.find(pkg => pkg.id === values.packageId);
      if (!selectedPkg) {
        toast({
          title: "Error",
          description: "Invalid package selected",
          variant: "destructive",
        });
        return;
      }

      const registration = await api.createRegistration({
        user_id: user.id,
        contact_first_name: values.contact_first_name,
        contact_last_name: values.contact_last_name,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone,
        company_name: values.company_name,
        company_address: values.company_address,
        package_id: values.packageId,
        total_amount: parseFloat(selectedPkg.price),
        players: values.players
      });

      // Send invoice email
      try {
        await api.sendInvoice(registration.id);
        toast({
          title: "Registration Complete",
          description: "Your registration is complete and invoice has been sent to your email!",
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        toast({
          title: "Registration Complete",
          description: "Registration saved but email failed to send. You can still download your invoice.",
        });
      }

      onRegistrationComplete({ ...registration, packages: selectedPkg });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Golf Day Registration</CardTitle>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            1
          </div>
          <div className="flex-1 h-1 bg-muted">
            <div className={`h-full bg-primary transition-all duration-300 ${currentStep >= 2 ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            2
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {currentStep === 1 ? "Contact Information & Package Selection" : "Player Details"}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contact_first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person - First Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact_last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person - Last Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="packageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Package *</FormLabel>
                      <Select onValueChange={handlePackageChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a package" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {packages.map((pkg) => (
                            <SelectItem key={pkg.id} value={pkg.id}>
                              {pkg.name} - R{parseFloat(pkg.price).toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedPackage && (
                  <Card className="bg-muted">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{selectedPackage.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{selectedPackage.description}</p>
                      <p className="text-lg font-bold text-primary">Total: R{parseFloat(selectedPackage.price).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Players to register: {getPlayerCount(selectedPackage.name)}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!selectedPackage}
                  >
                    Next: Player Details
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && selectedPackage && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Player Information</h3>
                
                {form.watch("players").map((_, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-medium mb-4">Player {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`players.${index}.player_name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`players.${index}.player_email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`players.${index}.tshirt_size`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>T-Shirt Size *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {tshirtSizes.map((size) => (
                                  <SelectItem key={size} value={size}>
                                    {size}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`players.${index}.dietary_requirements`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dietary Requirements</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} placeholder="Any dietary restrictions or special requirements" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`players.${index}.attending_gala_dinner`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Will attend the Gala Dinner
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Complete Registration"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PlayerRegistrationForm;