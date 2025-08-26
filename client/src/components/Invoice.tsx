import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";

interface InvoiceProps {
  registration: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    physical_address: string;
    total_amount: string;
    invoice_number: string;
    created_at: string;
    packages: {
      name: string;
      description: string | null;
      price: string;
    };
  };
}

const Invoice = ({ registration }: InvoiceProps) => {
  const handleDownload = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice ${registration.invoice_number}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .invoice-details { margin-bottom: 20px; }
              .customer-details { margin-bottom: 20px; }
              .package-details { margin-bottom: 20px; }
              .payment-details { margin-top: 30px; padding: 15px; background: #f5f5f5; }
              .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>St John's Church Golf Day</h1>
              <h2>Invoice</h2>
            </div>
            
            <div class="invoice-details">
              <strong>Invoice Number:</strong> ${registration.invoice_number}<br>
              <strong>Date:</strong> ${new Date(registration.created_at).toLocaleDateString()}<br>
            </div>
            
            <div class="customer-details">
              <h3>Customer Details:</h3>
              <strong>Name:</strong> ${registration.first_name} ${registration.last_name}<br>
              <strong>Email:</strong> ${registration.email}<br>
              <strong>Address:</strong> ${registration.physical_address}<br>
            </div>
            
            <div class="package-details">
              <h3>Package Details:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${registration.packages.name}<br><small>${registration.packages.description}</small></td>
                    <td>R${parseFloat(registration.total_amount).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="total">
              <strong>Total Amount: R${parseFloat(registration.total_amount).toFixed(2)}</strong>
            </div>
            
            <div class="payment-details">
              <h3>Payment Details:</h3>
              <strong>Bank:</strong> Standard Bank<br>
              <strong>Account Name:</strong> St John Vianney<br>
              <strong>Account Number:</strong> 011801174<br>
              <strong>Branch Code:</strong> 001245<br>
              <strong>Reference:</strong> ${registration.first_name} ${registration.last_name}<br>
              <br>
              <em>Please use your name as the payment reference.</em>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">St John's Church Golf Day</CardTitle>
        <h2 className="text-xl font-semibold">Invoice</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Invoice Details</h3>
            <p><strong>Invoice Number:</strong> {registration.invoice_number}</p>
            <p><strong>Date:</strong> {new Date(registration.created_at).toLocaleDateString()}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Customer Details</h3>
            <p><strong>Name:</strong> {registration.first_name} {registration.last_name}</p>
            <p><strong>Email:</strong> {registration.email}</p>
            <p><strong>Address:</strong> {registration.physical_address}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-4">Package Details</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{registration.packages.name}</p>
                      <p className="text-sm text-muted-foreground">{registration.packages.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">R{parseFloat(registration.total_amount).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Separator />

        <div className="text-right">
          <p className="text-2xl font-bold">Total: R{parseFloat(registration.total_amount).toFixed(2)}</p>
        </div>

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="text-lg">Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Bank:</strong> Standard Bank</p>
                <p><strong>Account Name:</strong> St John Vianney</p>
                <p><strong>Account Number:</strong> 011801174</p>
              </div>
              <div>
                <p><strong>Branch Code:</strong> 001245</p>
                <p><strong>Reference:</strong> {registration.first_name} {registration.last_name}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground font-medium">
              Please use your name as the payment reference when making the payment.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Invoice;