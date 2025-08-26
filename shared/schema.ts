import { pgTable, text, serial, integer, boolean, decimal, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: varchar("user_id"),
  contact_first_name: text("contact_first_name").notNull(),
  contact_last_name: text("contact_last_name").notNull(),
  contact_email: text("contact_email").notNull(),
  contact_phone: text("contact_phone"),
  company_name: text("company_name"),
  company_address: text("company_address"),
  package_id: varchar("package_id").notNull().references(() => packages.id),
  total_amount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  invoice_number: text("invoice_number").notNull().unique(),
  payment_status: text("payment_status").default("pending"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const players = pgTable("players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  registration_id: varchar("registration_id").notNull().references(() => registrations.id),
  player_name: text("player_name").notNull(),
  player_email: text("player_email"),
  tshirt_size: text("tshirt_size").notNull(),
  dietary_requirements: text("dietary_requirements"),
  attending_gala_dinner: boolean("attending_gala_dinner").default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;
