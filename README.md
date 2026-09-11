# Chic Charm Collections

A premium, responsive Nigerian fashion and lifestyle e-commerce storefront for bags, clothing, household appliances, and jewelry.

## Technology

- React 19 + TypeScript
- TanStack Start and TanStack Router
- Tailwind CSS 4
- Motion for accessible micro-interactions
- Netlify Functions for secure Paystack requests
- Netlify Database with Drizzle ORM for order records

## Local Development

1. Install dependencies with `pnpm install`.
2. Create a `.env` file from `.env.example`.
3. Run `netlify dev --port 8889` so functions and the app run together.
4. Open `http://localhost:8889`.

## Environment Variables

- `PAYSTACK_SECRET_KEY` — required server-only Paystack secret key. Configure this in Netlify; never prefix it with `VITE_`.
- `PAYSTACK_CALLBACK_URL` — optional absolute callback URL. When omitted, the function uses the deployed site's `/order-success` route.

The checkout uses server-side Paystack transaction initialization, so a frontend public key is not required. If a future inline Paystack flow is added, expose only `VITE_PAYSTACK_PUBLIC_KEY` and continue verifying transactions server-side.

## Catalog Management

Products live in `src/data/products.ts` and support ID, name, description, price, image, category, subcategory, availability, featured/new/best-seller flags, discount, stock quantity, and creation date. Set `inStock: false` and `stockQuantity: 0` to automatically show “OUT OF STOCK” and disable purchasing.

## Netlify Deployment

1. Connect the repository to Netlify.
2. Add `PAYSTACK_SECRET_KEY` under project environment variables.
3. Optionally set `PAYSTACK_CALLBACK_URL` to `https://your-domain.example/order-success`.
4. Deploy. Netlify applies the order-table migration automatically and the TanStack Start adapter handles direct route refreshes.
5. Configure the same callback URL in your Paystack dashboard if required by your Paystack account settings.

Use Paystack test credentials first, confirm the full redirect and verification flow, then replace them with live server credentials.
