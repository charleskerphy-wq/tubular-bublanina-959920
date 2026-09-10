CREATE TABLE "orders" (
	"reference" text PRIMARY KEY,
	"customer" jsonb NOT NULL,
	"items" jsonb NOT NULL,
	"subtotal" integer NOT NULL,
	"delivery_fee" integer NOT NULL,
	"total" integer NOT NULL,
	"paid" boolean DEFAULT false NOT NULL,
	"paystack_status" text DEFAULT 'pending' NOT NULL,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
