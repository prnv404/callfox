# DodoPayments Integration with Better Auth

This guide covers the complete integration of DodoPayments with Better Auth in your Callvox backend.

## 📦 What's Included

The integration includes **4 powerful plugins**:

1. **Checkout** - Secure payment processing with product slug mapping
2. **Portal** - Customer self-service portal for subscriptions
3. **Usage** - Metered billing and usage tracking
4. **Webhooks** - Real-time payment event processing

## 🔧 Setup Checklist

### ✅ Step 1: Environment Variables

Add these to your `.env` file:

```env
# DodoPayments Configuration
DODO_PAYMENTS_API_KEY=your-api-key-here
DODO_PAYMENTS_WEBHOOK_SECRET=your-webhook-secret-here
DODO_PAYMENTS_ENVIRONMENT=test_mode  # or live_mode for production
```

### ✅ Step 2: Get Your API Key

1. Go to [Dodo Payments Dashboard](https://dashboard.dodopayments.com) → **Developer** → **API Keys**
2. Create a new API key (or use existing)
3. Copy the API key value
4. Set `DODO_PAYMENTS_API_KEY` in your `.env`

### ✅ Step 3: Configure Webhook (Important!)

#### Set Up Webhook URL

Your webhook endpoint is automatically created at:

```
https://your-domain.com/api/auth/dodopayments/webhooks
```

For local development:
```
http://localhost:3001/api/auth/dodopayments/webhooks
```

#### Register Webhook in Dashboard

1. Go to **Dodo Payments Dashboard** → **Developer** → **Webhooks**
2. Click "Add Webhook" or "Create Webhook"
3. Enter your webhook URL
4. Select events you want to receive (or select all)
5. Copy the generated **webhook secret**
6. Set `DODO_PAYMENTS_WEBHOOK_SECRET` in your `.env`

## 🛒 Plugin 1: Checkout

### Purpose
Enable secure payment processing using Checkout Sessions with product slug mapping.

### Configuration

Products are configured in `src/config/auth.ts`:

```typescript
checkout({
  products: [
    {
      productId: "pdt_xxxxxxxxxxxxxxxxxxxxx",
      slug: "premium-plan",
    },
    {
      productId: "pdt_yyyyyyyyyyyyyyyyyyyyyyy",
      slug: "enterprise-plan",
    },
  ],
  successUrl: "/dashboard/success",
  authenticatedUsersOnly: true,
}),
```

### Setup Steps

1. **Create Products in Dashboard:**
   - Go to Dodo Payments Dashboard → **Products**
   - Create your products (subscriptions, one-time purchases, etc.)
   - Copy each product ID (starts with `pdt_`)

2. **Add Products to Config:**
   - Update the `products` array in `src/config/auth.ts`
   - Assign friendly slugs to each product

3. **Create Success Page:**
   - Create a success page at `/dashboard/success` in your frontend
   - This page will be shown after successful payment

### Usage (Frontend/Client)

```typescript
// Import auth client (you'll need to set this up on frontend)
import { authClient } from "./lib/auth-client";

// Create checkout session using slug
const handleCheckout = async () => {
  const { data: session, error } = await authClient.dodopayments.checkoutSession({
    slug: "premium-plan",
    referenceId: "order_123", // Optional
  });

  if (session) {
    window.location.href = session.url; // Redirect to checkout
  }
  
  if (error) {
    console.error("Checkout failed:", error);
  }
};
```

### API Endpoints

The checkout plugin automatically creates these endpoints:

- `POST /api/auth/dodopayments/checkout-session` - Create checkout session

## 🏪 Plugin 2: Portal

### Purpose
Provides customers with a self-service portal to manage subscriptions and view payment history.

### Features

- View and manage subscriptions
- Access payment history
- Update billing information
- Cancel subscriptions

### Usage (Frontend/Client)

```typescript
// Access customer portal
const handlePortalAccess = async () => {
  const { data: portal, error } = await authClient.dodopayments.customer.portal();
  
  if (portal && portal.redirect) {
    window.location.href = portal.url; // Redirect to customer portal
  }
};

// List customer subscriptions
const getSubscriptions = async () => {
  const { data: subscriptions, error } = 
    await authClient.dodopayments.customer.subscriptions.list({
      query: {
        limit: 10,
        page: 1,
        active: true,
      },
    });

  console.log(subscriptions);
};

// List customer payments
const getPayments = async () => {
  const { data: payments, error } = 
    await authClient.dodopayments.customer.payments.list({
      query: {
        limit: 10,
        page: 1,
        status: "succeeded",
      },
    });

  console.log(payments);
};
```

### API Endpoints

- `GET /api/auth/dodopayments/customer/portal` - Access customer portal
- `GET /api/auth/dodopayments/customer/subscriptions` - List subscriptions
- `GET /api/auth/dodopayments/customer/payments` - List payments

**Note:** All portal endpoints require user authentication.

## 📊 Plugin 3: Usage (Metered Billing)

### Purpose
Track metered events (like API calls, minutes used, etc.) for usage-based billing.

### Setup Steps

1. **Create Usage Meters:**
   - Go to Dodo Payments Dashboard → **Usage** → **Meters**
   - Create meters for what you want to track (e.g., API calls, storage)
   - Copy the meter IDs (start with `mtr_`)

2. **Track Events:**
   Use the usage API to record events

### Usage (Frontend/Client)

```typescript
// Record a metered event
const trackUsage = async () => {
  const { error } = await authClient.dodopayments.usage.ingest({
    event_id: crypto.randomUUID(),
    event_name: "api_request",
    metadata: {
      route: "/api/agents",
      method: "POST",
      region: "us-east-1",
    },
    timestamp: new Date(), // Optional, defaults to now
  });

  if (error) {
    console.error("Failed to track usage:", error);
  }
};

// Get usage history
const getUsage = async () => {
  const { data: usage, error } = 
    await authClient.dodopayments.usage.meters.list({
      query: {
        page_size: 20,
        meter_id: "mtr_yourMeterId", // Optional filter
      },
    });

  if (usage?.items) {
    usage.items.forEach((event) => {
      console.log(event.event_name, event.timestamp, event.metadata);
    });
  }
};
```

### Important Notes

- User must have a verified email before tracking usage
- Timestamps older than 1 hour are rejected
- Timestamps more than 5 minutes in the future are rejected
- Events are tied to the authenticated user's customer account

### API Endpoints

- `POST /api/auth/dodopayments/usage/ingest` - Record usage event
- `GET /api/auth/dodopayments/usage/meters` - List usage history

## 🔔 Plugin 4: Webhooks

### Purpose
Handle real-time payment events from Dodo Payments with secure signature verification.

### Webhook URL

Your webhook endpoint is automatically created at:
```
https://your-domain.com/api/auth/dodopayments/webhooks
```

### Supported Events

The integration handles these webhook events:

#### Payment Events
- `payment.succeeded` - Payment completed successfully
- `payment.failed` - Payment failed
- `payment.processing` - Payment is being processed
- `payment.cancelled` - Payment was cancelled

#### Refund Events
- `refund.succeeded` - Refund completed
- `refund.failed` - Refund failed

#### Dispute Events
- `dispute.opened` - Dispute opened
- `dispute.expired` - Dispute expired
- `dispute.accepted` - Dispute accepted
- `dispute.cancelled` - Dispute cancelled
- `dispute.challenged` - Dispute challenged
- `dispute.won` - Dispute won
- `dispute.lost` - Dispute lost

#### Subscription Events
- `subscription.active` - Subscription activated
- `subscription.on_hold` - Subscription on hold
- `subscription.renewed` - Subscription renewed
- `subscription.plan_changed` - Plan changed
- `subscription.cancelled` - Subscription cancelled
- `subscription.failed` - Subscription failed
- `subscription.expired` - Subscription expired

#### License Events
- `license_key.created` - License key created

### Customize Webhook Handlers

Edit `src/config/auth.ts` to add your business logic:

```typescript
webhooks({
  webhookKey: env.DODO_PAYMENTS_WEBHOOK_SECRET,
  
  // Handle successful payments
  onPaymentSucceeded: async (payload) => {
    console.log("Payment succeeded:", payload);
    
    // TODO: Your business logic
    // - Grant access to purchased features
    // - Send confirmation email
    // - Update user's subscription status
  },
  
  // Handle failed payments
  onPaymentFailed: async (payload) => {
    console.log("Payment failed:", payload);
    
    // TODO: Your business logic
    // - Notify user of payment failure
    // - Retry payment
    // - Send alert to admin
  },
  
  // Handle active subscriptions
  onSubscriptionActive: async (payload) => {
    console.log("Subscription active:", payload);
    
    // TODO: Your business logic
    // - Activate premium features
    // - Update database
    // - Send welcome email
  },
  
  // Handle cancelled subscriptions
  onSubscriptionCancelled: async (payload) => {
    console.log("Subscription cancelled:", payload);
    
    // TODO: Your business logic
    // - Revoke premium access
    // - Send cancellation confirmation
    // - Schedule data cleanup
  },
}),
```

### Security

✅ **Automatic Signature Verification**
- All webhook payloads are verified using your webhook secret
- Invalid signatures are automatically rejected
- Protects against replay attacks and tampering

## 🚀 Testing Your Integration

### 1. Test Mode

Start with test mode to safely test your integration:

```env
DODO_PAYMENTS_ENVIRONMENT=test_mode
```

### 2. Test Checkout Flow

```typescript
// Create a test checkout
const { data: session } = await authClient.dodopayments.checkoutSession({
  slug: "premium-plan",
});

window.location.href = session.url;
```

### 3. Test Webhooks Locally

Use tools like [ngrok](https://ngrok.com/) to expose your local server:

```bash
ngrok http 3001
```

Then use the ngrok URL for your webhook endpoint:
```
https://your-ngrok-url.ngrok.io/api/auth/dodopayments/webhooks
```

### 4. Monitor Webhook Events

Check your logs for webhook events:

```bash
# Your server logs will show:
[INFO] Received webhook: payment.succeeded
[INFO] Payment succeeded: { ... payload ... }
```

## 📝 Best Practices

### 1. Always Use Environment Variables
Never hardcode API keys or secrets in your code.

### 2. Verify Webhooks in Production
Always use webhook signature verification (automatically enabled).

### 3. Handle Errors Gracefully
All client methods return `{ data, error }` for proper error handling.

### 4. Use Test Mode First
Test thoroughly in test mode before switching to live mode.

### 5. Implement Idempotency
Use unique event IDs for usage tracking to prevent duplicates.

### 6. Log Important Events
Log all payment and subscription events for debugging and auditing.

## 🔄 Switching to Production

When ready for production:

1. **Update Environment:**
   ```env
   DODO_PAYMENTS_ENVIRONMENT=live_mode
   ```

2. **Get Production API Keys:**
   - Create production API keys in the dashboard
   - Update `DODO_PAYMENTS_API_KEY`

3. **Update Webhook URL:**
   - Point webhook to production domain
   - Get new webhook secret for production
   - Update `DODO_PAYMENTS_WEBHOOK_SECRET`

4. **Test Thoroughly:**
   - Test all payment flows
   - Verify webhook delivery
   - Check subscription management

## 🐛 Troubleshooting

### Webhooks Not Received

1. Check webhook URL is correct
2. Verify webhook secret is set
3. Check server logs for errors
4. Test webhook signature verification

### Checkout Not Working

1. Verify product IDs are correct
2. Check success URL is valid
3. Ensure user is authenticated (if required)
4. Check API key is valid

### Usage Tracking Fails

1. Verify user email is verified
2. Check meter ID is correct
3. Ensure timestamp is within valid range
4. Verify user is authenticated

## 📚 Additional Resources

- [DodoPayments Documentation](https://docs.dodopayments.com)
- [Better Auth Documentation](https://better-auth.com)
- [DodoPayments Dashboard](https://dashboard.dodopayments.com)
- [API Reference](https://docs.dodopayments.com/api-reference)

## 🎯 Quick Reference

### Environment Variables
```env
DODO_PAYMENTS_API_KEY=your-api-key
DODO_PAYMENTS_WEBHOOK_SECRET=your-webhook-secret
DODO_PAYMENTS_ENVIRONMENT=test_mode
```

### Available Endpoints
```
POST   /api/auth/dodopayments/checkout-session
GET    /api/auth/dodopayments/customer/portal
GET    /api/auth/dodopayments/customer/subscriptions
GET    /api/auth/dodopayments/customer/payments
POST   /api/auth/dodopayments/usage/ingest
GET    /api/auth/dodopayments/usage/meters
POST   /api/auth/dodopayments/webhooks
```

---

Need help? Check the DodoPayments documentation or reach out to support!
