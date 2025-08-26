import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  physicalAddress: z.string().min(10, "Please provide a complete address"),
  packageId: z.string().min(1, "Please select a package"),
});

interface Package {
  id: string;
  name: string;
  description: string | null;
  price: string;
  created_at: string;
}

interface RegistrationFormProps {
  onRegistrationComplete: (registrationData: any) => void;
}

const RegistrationForm = ({ onRegistrationComplete }: RegistrationFormProps) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      physicalAddress: "",
      packageId: "",
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
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        physical_address: values.physicalAddress,
        package_id: values.packageId,
        total_amount: parseFloat(selectedPkg.price),
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

  const handlePackageChange = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    setSelectedPackage(pkg || null);
    form.setValue("packageId", packageId);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Golf Day Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
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
              name="email"
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
              name="physicalAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Physical Address</FormLabel>
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
                  <FormLabel>Select Package</FormLabel>
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
                </CardContent>
              </Card>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Register & Generate Invoice"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;