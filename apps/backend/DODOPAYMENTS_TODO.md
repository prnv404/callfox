# DodoPayments Setup TODO

Complete these tasks to finish your DodoPayments integration:

## 🔑 1. Get API Credentials

### API Key
- [ ] Go to [Dodo Payments Dashboard](https://dashboard.dodopayments.com)
- [ ] Navigate to **Developer** → **API Keys**
- [ ] Create or copy your API key
- [ ] Add to `.env`: `DODO_PAYMENTS_API_KEY=your-api-key-here`

### Better Auth Secret
- [ ] Generate a random secret (32+ characters)
- [ ] Add to `.env`: `BETTER_AUTH_SECRET=your-secret-here`

## 🌐 2. Configure Webhook

### Webhook URL
Your webhook endpoint will be:
- **Development:** `http://localhost:3001/api/auth/dodopayments/webhooks`
- **Production:** `https://your-domain.com/api/auth/dodopayments/webhooks`

### Setup in Dashboard
- [ ] Go to **Dodo Payments Dashboard** → **Developer** → **Webhooks**
- [ ] Click "Add Webhook"
- [ ] Enter your webhook URL
- [ ] Select events (or select all)
- [ ] Copy the generated webhook secret
- [ ] Add to `.env`: `DODO_PAYMENTS_WEBHOOK_SECRET=your-webhook-secret-here`

## 🛍️ 3. Create Products (For Checkout Plugin)

- [ ] Go to **Dodo Payments Dashboard** → **Products**
- [ ] Create your products/plans
- [ ] Copy each product ID (starts with `pdt_`)
- [ ] Update `src/config/auth.ts` with your products:

```typescript
checkout({
  products: [
    {
      productId: "pdt_YOUR_PRODUCT_ID_HERE",
      slug: "premium-plan",
    },
  ],
  successUrl: "/dashboard/success",
  authenticatedUsersOnly: true,
}),
```

## 📊 4. Create Usage Meters (For Usage Plugin - Optional)

If you plan to use metered billing:

- [ ] Go to **Dodo Payments Dashboard** → **Usage** → **Meters**
- [ ] Create meters for what you want to track (e.g., API calls)
- [ ] Copy meter IDs (start with `mtr_`)
- [ ] Use these IDs when listing usage in your app

## ✅ 5. Update Environment File

Make sure your `.env` file has all required variables:

```env
# Database
DATABASE_URL=postgresql://...

# Better Auth
BETTER_AUTH_SECRET=your-secret-at-least-32-chars
BETTER_AUTH_URL=http://localhost:3001

# Frontend
FRONTEND_URL=http://localhost:3000

# DodoPayments
DODO_PAYMENTS_API_KEY=your-api-key-here
DODO_PAYMENTS_WEBHOOK_SECRET=your-webhook-secret-here
DODO_PAYMENTS_ENVIRONMENT=test_mode

# Server
NODE_ENV=development
PORT=3001
```

## 🚀 6. Create Frontend Success Page

- [ ] Create success page at `/dashboard/success` in your frontend
- [ ] This page will show after successful payments
- [ ] Display confirmation message and order details

## 🧪 7. Test Your Integration

### Test Checkout
```typescript
const { data: session } = await authClient.dodopayments.checkoutSession({
  slug: "premium-plan",
});
window.location.href = session.url;
```

### Test Portal Access
```typescript
const { data: portal } = await authClient.dodopayments.customer.portal();
window.location.href = portal.url;
```

### Test Usage Tracking
```typescript
await authClient.dodopayments.usage.ingest({
  event_id: crypto.randomUUID(),
  event_name: "api_request",
  metadata: { route: "/api/test" },
});
```

### Monitor Webhooks
- [ ] Check server logs for webhook events
- [ ] Verify webhook handlers are triggered
- [ ] Test with Dodo Payments test mode

## 📱 8. Frontend Integration

You'll need to set up the auth client on your frontend:

```typescript
// lib/auth-client.ts (Frontend)
import { createAuthClient } from "better-auth/react";
import { dodopaymentsClient } from "@dodopayments/better-auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3001",
  plugins: [dodopaymentsClient()],
});
```

## 🔄 9. When Going to Production

- [ ] Switch to live mode: `DODO_PAYMENTS_ENVIRONMENT=live_mode`
- [ ] Get production API keys from dashboard
- [ ] Update production environment variables
- [ ] Update webhook URL to production domain
- [ ] Get new webhook secret for production
- [ ] Test thoroughly before launch

## 📚 10. Read Documentation

- [ ] Review `DODOPAYMENTS.md` for detailed usage examples
- [ ] Check [DodoPayments Docs](https://docs.dodopayments.com)
- [ ] Understand webhook event types
- [ ] Plan your business logic for each event

---

## ✨ Quick Start Command

Once you've completed the above, start your server:

```bash
bun run dev
```

Your DodoPayments integration is now ready! 🎉

## 🆘 Need Help?

- 📖 Read `DODOPAYMENTS.md` for comprehensive guide
- 🌐 Visit [DodoPayments Documentation](https://docs.dodopayments.com)
- 💬 Contact Dodo Payments support
