import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { packages, registrations } from "../shared/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import bcrypt from "bcrypt";

export async function registerRoutes(app: Express): Promise<Server> {
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
        first_name,
        last_name,
        email,
        physical_address,
        package_id,
        total_amount,
        user_id
      } = req.body;

      // Generate invoice number
      const invoiceNumber = await generateInvoiceNumber();

      const [newRegistration] = await db.insert(registrations).values({
        first_name,
        last_name,
        email,
        physical_address,
        package_id,
        total_amount: String(total_amount),
        user_id: user_id || null,
        invoice_number: invoiceNumber,
        payment_status: "pending"
      }).returning();

      res.json(newRegistration);
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
          first_name: registrations.first_name,
          last_name: registrations.last_name,
          email: registrations.email,
          physical_address: registrations.physical_address,
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

      // For now, return success (email functionality would require external service)
      res.json({ 
        success: true, 
        message: "Invoice sent successfully",
        invoiceNumber: registration[0].invoice_number 
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
