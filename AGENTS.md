# Chic Charm Collections — Agent Guide

## Architecture

This is a React 19 and TypeScript storefront built with TanStack Start, TanStack Router, Tailwind CSS 4, Motion, and Netlify. The application is server-rendered by TanStack Start on Netlify, while cart state is intentionally browser-local.

## Key Directories

- `src/routes/` contains file-based storefront routes.
- `src/components/` contains shared layout, catalog, and commerce UI.
- `src/context/CartContext.tsx` owns localStorage cart state and cart feedback.
- `src/data/products.ts` is the editable first-version product catalog.
- `netlify/functions/` contains secure Paystack initialization and verification.
- `db/` defines the Netlify Database schema and Drizzle client.
- `netlify/database/migrations/` contains generated deploy-time migrations.

## Conventions

- Keep product availability controlled by both `inStock` and `stockQuantity`.
- Calculate trusted prices in server code before initializing payments.
- Never expose `PAYSTACK_SECRET_KEY` to client-side code.
- Use `formatNaira` for customer-facing currency.
- Prefer reusable components and typed product/category values.
- Keep motion transform/opacity-based and respect reduced-motion preferences.
- Use semantic HTML, descriptive image alt text, and visible focus states.

## Payment Flow

Checkout posts product IDs and quantities to `/api/paystack/initialize`. The function rebuilds totals from canonical product data, creates a pending database order, and returns Paystack's hosted authorization URL. `/order-success` calls `/api/paystack/verify`; the function confirms status, currency, reference, and amount directly with Paystack before marking the order paid. The browser clears the cart only after that verification succeeds.

## Extending Products

Edit `src/data/products.ts` to add or update first-version catalog items. A future admin can move the same `Product` shape into Netlify Database without changing the storefront component contract.
