-- Create packages table for golf day packages
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create registrations table for user registrations
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  physical_address TEXT NOT NULL,
  package_id UUID REFERENCES public.packages(id) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for packages (public read)
CREATE POLICY "Packages are viewable by everyone" 
ON public.packages 
FOR SELECT 
USING (true);

-- Create policies for registrations (users can only see their own)
CREATE POLICY "Users can view their own registrations" 
ON public.registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own registrations" 
ON public.registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registrations" 
ON public.registrations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Insert sample packages
INSERT INTO public.packages (name, description, price) VALUES
('Standard Package', 'Includes green fees, cart, and lunch', 150.00),
('Premium Package', 'Includes green fees, cart, lunch, and dinner', 250.00),
('VIP Package', 'Includes everything plus welcome drinks and gifts', 350.00);

-- Create function to generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'INV-(\d+)') AS INTEGER)), 0) + 1
  INTO next_num
  FROM public.registrations
  WHERE invoice_number ~ '^INV-\d+$';
  
  RETURN 'INV-' || LPAD(next_num::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate invoice numbers
CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
    NEW.invoice_number := generate_invoice_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_invoice_number_trigger
  BEFORE INSERT ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION set_invoice_number();