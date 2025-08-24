/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const resend = new Resend('re_EGTssy2A_K4k1yfvpwpFGEZ6iZzEev55f');

interface InvoiceRequest {
  registrationId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { registrationId }: InvoiceRequest = await req.json();

    // Fetch registration details with package info
    const { data: registration, error } = await supabaseClient
      .from("registrations")
      .select(`
        *,
        packages (*)
      `)
      .eq("id", registrationId)
      .single();

    if (error || !registration) {
      throw new Error("Registration not found");
    }

    // Generate invoice HTML
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice ${registration.invoice_number}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              color: #333; 
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #4CAF50;
              padding-bottom: 20px;
            }
            .invoice-details { margin-bottom: 20px; }
            .customer-details { margin-bottom: 20px; }
            .package-details { margin-bottom: 20px; }
            .payment-details { 
              margin-top: 30px; 
              padding: 15px; 
              background: #f8f9fa; 
              border: 1px solid #dee2e6;
              border-radius: 5px;
            }
            .total { 
              font-size: 18px; 
              font-weight: bold; 
              margin-top: 20px; 
              text-align: right;
              color: #4CAF50;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 10px 0;
            }
            th, td { 
              padding: 12px; 
              text-align: left; 
              border-bottom: 1px solid #ddd; 
            }
            th { 
              background-color: #f8f9fa; 
              font-weight: bold;
            }
            .highlight { color: #4CAF50; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="color: #4CAF50; margin: 0;">St John's Church Golf Day</h1>
            <h2 style="margin: 10px 0;">Invoice</h2>
          </div>
          
          <div class="invoice-details">
            <p><strong>Invoice Number:</strong> <span class="highlight">${registration.invoice_number}</span></p>
            <p><strong>Date:</strong> ${new Date(registration.created_at).toLocaleDateString()}</p>
          </div>
          
          <div class="customer-details">
            <h3 style="color: #4CAF50;">Customer Details:</h3>
            <p><strong>Name:</strong> ${registration.first_name} ${registration.last_name}</p>
            <p><strong>Email:</strong> ${registration.email}</p>
            <p><strong>Address:</strong> ${registration.physical_address}</p>
          </div>
          
          <div class="package-details">
            <h3 style="color: #4CAF50;">Package Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>${registration.packages.name}</strong><br>
                    <small style="color: #666;">${registration.packages.description}</small>
                  </td>
                  <td style="text-align: right;"><strong>R${registration.total_amount.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="total">
            <strong>Total Amount: R${registration.total_amount.toFixed(2)}</strong>
          </div>
          
          <div class="payment-details">
            <h3 style="color: #4CAF50; margin-top: 0;">Payment Details:</h3>
            <table style="margin: 0;">
              <tr>
                <td><strong>Bank:</strong></td>
                <td>Standard Bank</td>
              </tr>
              <tr>
                <td><strong>Account Name:</strong></td>
                <td>St John Vianney</td>
              </tr>
              <tr>
                <td><strong>Account Number:</strong></td>
                <td>011801174</td>
              </tr>
              <tr>
                <td><strong>Branch Code:</strong></td>
                <td>001245</td>
              </tr>
              <tr>
                <td><strong>Reference:</strong></td>
                <td class="highlight">${registration.first_name} ${registration.last_name}</td>
              </tr>
            </table>
            <p style="margin-top: 15px; font-style: italic; color: #666;">
              <strong>Important:</strong> Please use your name as the payment reference when making the payment.
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
            <p>Thank you for registering for St John's Church Golf Day!</p>
            <p>If you have any questions, please contact us.</p>
          </div>
        </body>
      </html>
    `;

    // Send email with invoice
    console.log("Sending email to:", registration.email);
    const emailResponse = await resend.emails.send({
      from: "St John's Golf Day <onboarding@resend.dev>",
      to: [registration.email],
      subject: `Golf Day Registration Invoice - ${registration.invoice_number}`,
      html: invoiceHtml,
    });

    console.log("Email response:", JSON.stringify(emailResponse, null, 2));

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Invoice sent successfully",
      invoiceNumber: registration.invoice_number 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-invoice function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);