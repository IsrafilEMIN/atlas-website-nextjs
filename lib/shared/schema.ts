import { pgTable, text, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (existing)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Bookings table for appointments
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  serviceType: text("service_type").notNull(),
  availableTime: integer("available_time").notNull(),
  status: text("status").notNull().default('pending'),
  projectDetails: text("project_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Notifications table for tracking communications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").references(() => bookings.id).notNull(),
  type: text("type").notNull(), // 'email' or 'sms'
  status: text("status").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
  content: text("content").notNull(),
});

export const insertBookingSchema = z.object({
  customerName: z.string().min(1, "Enter your name"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(1, "Enter your name"),
  serviceType: z.string().min(1, "Select a service type"),
  projectDetails: z.string().optional(),
  availableTime: z.string().min(1, "Enter your available time"),
});

export const insertReviewSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  rating: z.number(),
  comment: z.string().min(1, "Enter your comment, tell us what you think!"),
  serviceType: z.string().min(1, "Select a service type"),
  customerId: z.string().optional(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  sentAt: true,
});

// Types for TypeScript
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type User = typeof users.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type Review = {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  // ...other fields
};

export type InsertUser = z.infer<typeof insertUserSchema>;