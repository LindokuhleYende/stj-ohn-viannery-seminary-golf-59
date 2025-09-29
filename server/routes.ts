import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { packages, registrations, players } from "../shared/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Resend } from "resend";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  // Get all packages
  app.get("/api/packages", async (req, res) => {
    try {
      const allPackages = await db.select().from(packages);
      res.json(allPackages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      res.status(500).json({ error: "Failed to fetch packages" });
    }
  });

  // Create a registration
  app.post("/api/registrations", async (req, res) => {
    try {
      const {
        contact_first_name,
        contact_last_name,
        contact_email,
        contact_phone,
        company_name,
        company_address,
        package_id,
        total_amount,
        user_id,
        players: playerData
      } = req.body;

      // Generate invoice number
      const invoiceNumber = await generateInvoiceNumber();

      const [newRegistration] = await db.insert(registrations).values({
        contact_first_name,
        contact_last_name,
        contact_email,
        contact_phone,
        company_name,
        company_address,
        package_id,
        total_amount: String(total_amount),
        user_id: user_id || null,
        invoice_number: invoiceNumber,
        payment_status: "pending"
      }).returning();

      // Insert players if provided
      let playerRecords: any[] = [];
      if (playerData && playerData.length > 0) {
        playerRecords = await db.insert(players).values(
          playerData.map((player: any) => ({
            registration_id: newRegistration.id,
            player_name: player.player_name,
            player_email: player.player_email,
            tshirt_size: player.tshirt_size,
            dietary_requirements: player.dietary_requirements,
            attending_gala_dinner: player.attending_gala_dinner
          }))
        ).returning();
      }

      // Return complete registration data with players
      res.json({
        ...newRegistration,
        players: playerRecords
      });
    } catch (error) {
      console.error("Error creating registration:", error);
      res.status(500).json({ error: "Failed to create registration" });
    }
  });

  // Send invoice email
  app.post("/api/send-invoice", async (req, res) => {
    try {
      const { registrationId } = req.body;

      // Get registration with package details
      const registration = await db
        .select({
          id: registrations.id,
          contact_first_name: registrations.contact_first_name,
          contact_last_name: registrations.contact_last_name,
          contact_email: registrations.contact_email,
          contact_phone: registrations.contact_phone,
          company_name: registrations.company_name,
          company_address: registrations.company_address,
          total_amount: registrations.total_amount,
          invoice_number: registrations.invoice_number,
          payment_status: registrations.payment_status,
          created_at: registrations.created_at,
          package_name: packages.name,
          package_description: packages.description
        })
        .from(registrations)
        .leftJoin(packages, eq(registrations.package_id, packages.id))
        .where(eq(registrations.id, registrationId))
        .limit(1);

      if (!registration.length) {
        return res.status(404).json({ error: "Registration not found" });
      }

      // Get player details for this registration
      const playerDetails = await db
        .select()
        .from(players)
        .where(eq(players.registration_id, registrationId));

      const reg = registration[0];

      // Create player details table for email
      const playerDetailsHtml = playerDetails.length > 0 ? `
        <div style="margin: 20px 0;">
          <h3>Player Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Player Name</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">T-Shirt Size</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Dietary Requirements</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Gala Dinner</th>
              </tr>
            </thead>
            <tbody>
              ${playerDetails.map(player => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;">${player.player_name}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${player.tshirt_size}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${player.dietary_requirements || 'None specified'}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${player.attending_gala_dinner ? 'Yes' : 'No'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '';

      // Create HTML email content
      const emailHtml = `
        <html>
          <head>
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
              <h1>St John Vianney Seminary Golf Day</h1>
              <h2>Invoice</h2>
            </div>
            
            <div class="invoice-details">
              <strong>Invoice Number:</strong> ${reg.invoice_number}<br>
              <strong>Date:</strong> ${new Date(reg.created_at).toLocaleDateString()}<br>
            </div>
            
            <div class="customer-details">
              <h3>Customer Details:</h3>
              <strong>Name:</strong> ${reg.contact_first_name} ${reg.contact_last_name}<br>
              <strong>Email:</strong> ${reg.contact_email}<br>
              <strong>Address:</strong> ${reg.company_address || ''}<br>
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
                    <td>${reg.package_name}<br><small>${reg.package_description || ''}</small></td>
                    <td>R${parseFloat(reg.total_amount).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            ${playerDetailsHtml}
            
            <div class="total">
              <strong>Total Amount: R${parseFloat(reg.total_amount).toFixed(2)}</strong>
            </div>
            
            <div class="payment-details">
              <h3>Payment Details:</h3>
              <strong>Bank:</strong> Standard Bank<br>
              <strong>Account Name:</strong> St John Vianney<br>
              <strong>Account Number:</strong> 011801174<br>
              <strong>Branch Code:</strong> 001245<br>
              <strong>Reference:</strong> ${reg.contact_first_name} ${reg.contact_last_name}<br>
              <br>
              <em>Please use your name as the payment reference when making the payment.</em>
            </div>
          </body>
        </html>
      `;

      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: 'St John Vianney Golf Day <onboarding@resend.dev>',
        to: [reg.contact_email],
        subject: `Golf Day Registration Invoice - ${reg.invoice_number}`,
        html: emailHtml,
      });

      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send invoice email" });
      }

      console.log("Email sent successfully:", data);
      res.json({ 
        success: true, 
        message: "Invoice sent successfully",
        invoiceNumber: reg.invoice_number,
        emailId: data?.id
      });
    } catch (error) {
      console.error("Error sending invoice:", error);
      res.status(500).json({ error: "Failed to send invoice" });
    }
  });

  // Simple user session management (replacing Supabase Auth)
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // For now, create a simple session token
      const sessionToken = crypto.randomBytes(32).toString('hex');
      
      res.json({ 
        access_token: sessionToken, 
        user: { email, id: crypto.randomUUID() } 
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // For now, create a simple session token
      const sessionToken = crypto.randomBytes(32).toString('hex');
      
      res.json({ 
        access_token: sessionToken, 
        user: { email, id: crypto.randomUUID() } 
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Signup failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

async function generateInvoiceNumber(): Promise<string> {
  const result = await db.select({ invoice_number: registrations.invoice_number })
    .from(registrations)
    .orderBy(registrations.created_at);
  
  let maxNum = 0;
  for (const row of result) {
    const match = row.invoice_number.match(/INV-(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) {
        maxNum = num;
      }
    }
  }
  
  return `INV-${String(maxNum + 1).padStart(6, '0')}`;
}
