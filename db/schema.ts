import { boolean, integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const orders = pgTable('orders', {
  reference: text().primaryKey(),
  customer: jsonb().notNull(),
  items: jsonb().notNull(),
  subtotal: integer().notNull(),
  deliveryFee: integer('delivery_fee').notNull(),
  total: integer().notNull(),
  paid: boolean().notNull().default(false),
  paystackStatus: text('paystack_status').notNull().default('pending'),
  paidAt: timestamp('paid_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
