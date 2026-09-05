# 🛠️ NovaMint Networks — Production Setup & Operations Manual

This comprehensive guide outlines all manual post-completion steps, third-party dashboard configurations, GitHub Actions cron workflows, Cashfree payment webhooks, Indian GST legal identity settings, and deployment verification required to run **NovaMint Networks** in production.

---

## 📑 Table of Contents
1. [Architecture & Services Overview](#1-architecture--services-overview)
2. [Step 1: GitHub Actions Cron Setup (No Vercel Crons)](#step-1-github-actions-cron-setup-no-vercel-crons)
3. [Step 2: Cashfree Payment Gateway & Webhook Setup](#step-2-cashfree-payment-gateway--webhook-setup)
4. [Step 3: GSTIN & Corporate Legal Identity Customization](#step-3-gstin--corporate-legal-identity-customization)
5. [Step 4: Resend Email & Domain Verification](#step-4-resend-email--domain-verification)
6. [Step 5: Supabase Auth, Google OAuth & Database](#step-5-supabase-auth-google-oauth--database)
7. [Step 6: Optional AI & Rate Limiting (Groq & Upstash)](#step-6-optional-ai--rate-limiting-groq--upstash)
8. [Master Environment Variables Reference](#master-environment-variables-reference)
9. [Pre-Launch Testing & Verification Checklist](#pre-launch-testing--verification-checklist)

---

## 1. Architecture & Services Overview

NovaMint Networks runs on Next.js 16 (Turbopack, App Router) with strict server-side authentication, rate limiting, and zero Vercel cron dependency:

```
                  ┌──────────────────────────────────────────────────┐
                  │                 GITHUB ACTIONS                   │
                  │   cron-abandoned-checkout-recovery.yml (*/30)    │
                  └─────────────────────────┬────────────────────────┘
                                            │ Bearer CRON_SECRET
                                            ▼
┌──────────────────┐               ┌─────────────────────────────────┐               ┌──────────────────┐
│ CLIENT / BROWSER ├──────────────►│    NOVAMINT NETWORKS APP        ├──────────────►│  SUPABASE PG     │
│ Next.js 16 + UI  │               │    (Vercel / Node.js)           │               │  (Auth, Orders,  │
└────────┬─────────┘               └────────────────┬────────────────┘               │   Sprints, Items)│
         │                                          │                                └──────────────────┘
         │                                          │
         ▼                                          ▼
┌──────────────────┐               ┌─────────────────────────────────┐
│ CASHFREE PG      │◄─────────────►│ RESEND TRANSACTIONAL EMAILS     │
│ Drop SDK / UPI   │ Webhook Event │ (Invoices, Abandoned Recovery)  │
└──────────────────┘               └─────────────────────────────────┘
```

---

## Step 1: GitHub Actions Cron Setup (No Vercel Crons)

> **CRITICAL RULE**: Per infrastructure requirements, NovaMint **never** uses Vercel Cron jobs. All scheduled operations run via authenticated GitHub Actions workflows.

### Workflow File: `.github/workflows/cron-abandoned-checkout-recovery.yml`
- **Schedule**: Every 30 minutes (`*/30 * * * *`)
- **Manual Trigger**: Enabled via `workflow_dispatch`
- **Security**: Protected with `Authorization: Bearer ${{ secrets.CRON_SECRET }}`
- **Target Endpoint**: `GET /api/cron/recover-abandoned-checkouts`

### How to Configure GitHub Repository Secrets:
1. Open your GitHub repository in your browser: `https://github.com/<your-org>/<your-repo>`.
2. Click **Settings** (top tab navigation).
3. In the left sidebar, expand **Secrets and variables** ➔ Click **Actions**.
4. Under **Repository secrets**, click **New repository secret**.
5. Add the following two required secrets:

| Secret Key | Description | Example Value |
|---|---|---|
| `APP_URL` | Your public production domain without trailing slash | `https://novamint.in` (or `https://your-app.vercel.app`) |
| `CRON_SECRET` | 32-byte cryptographically secure hexadecimal string | `4f9b8c2d1e7a...` |

#### How to Generate a Secure `CRON_SECRET`:
Run this in your terminal or Node.js environment:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and use it for:
- GitHub Secret: `CRON_SECRET`
- Vercel / `.env.local`: `CRON_SECRET=<same_value>`

### How to Manually Test the Cron Job in GitHub:
1. In your GitHub repository, navigate to the **Actions** tab.
2. Under the left workflow list, click **Cron - Abandoned Checkout Recovery**.
3. Click the **Run workflow** dropdown on the right side.
4. Select branch `main` and click **Run workflow**.
5. Click on the initiated run to monitor real-time execution logs. Verify that the response code is `HTTP 200`.

---

## Step 2: Cashfree Payment Gateway & Webhook Setup

NovaMint uses Cashfree PG with `payment_session_id` Drop Checkout and HMAC-SHA256 signature verification.

### 1. Register / Log into Cashfree:
- **Sandbox Testing**: [https://sandbox.cashfree.com/](https://sandbox.cashfree.com/)
- **Production Live**: [https://merchant.cashfree.com/](https://merchant.cashfree.com/)

### 2. Obtain API Credentials:
1. Go to **Developers** ➔ **API Keys**.
2. Generate or copy:
   - **App ID** (Client ID) ➔ `CASHFREE_APP_ID`
   - **Secret Key** ➔ `CASHFREE_SECRET_KEY`
3. Set the environment mode:
   - For testing: `NEXT_PUBLIC_CASHFREE_MODE=sandbox`
   - For live payments: `NEXT_PUBLIC_CASHFREE_MODE=production`

### 3. Configure the Inbound Webhook Endpoint:
1. In the Cashfree Merchant Dashboard, go to **Developers** ➔ **Webhooks**.
2. Click **Add Webhook Endpoint** (or Edit existing).
3. Set **Endpoint URL**:
   ```
   https://yourdomain.com/api/webhooks/cashfree
   ```
   *(Replace `yourdomain.com` with your live production URL. For local testing, use an ngrok or Cloudflare tunnel URL).*
4. Select the following Webhook Events:
   - `PAYMENT_SUCCESS_WEBHOOK`
   - `PAYMENT_FAILED_WEBHOOK`
   - `PAYMENT_USER_DROPPED_WEBHOOK`
5. **CRITICAL — Webhook Signing Secret**:
   - In the Webhook section, Cashfree generates a dedicated **Webhook Secret** (separate from the API secret key).
   - Copy this value into:
     ```env
     CASHFREE_WEBHOOK_SECRET=your_cashfree_webhook_signing_secret
     ```
   - *Note*: Our backend uses constant-time `crypto.timingSafeEqual` comparison to prevent timing attacks.

---

## Step 3: GSTIN & Corporate Legal Identity Customization

NovaMint includes an Indian GST-compliant printable tax invoice generator (`/api/orders/invoice?order_id=<UUID>`) with SAC code `998313` (Information Technology & Cloud Consultancy Services) and automatic CGST+SGST / IGST calculation.

### Option A: Via Environment Variables (Recommended — Zero Code Changes)
Add these keys to your `.env.local` or Vercel Environment Variables:

```env
COMPANY_GSTIN=07AABCN1234M1Z5
COMPANY_CIN=U72900DL2025PTC418920
COMPANY_LEGAL_NAME="NovaMint Networks Private Limited / NovaMint Studios"
COMPANY_ADDRESS="Level 5, Cyber Tech Park, DLF Cyber City, Sector 24, Gurugram / New Delhi, 122002"
COMPANY_BILLING_EMAIL=billing@novamint.in
```

### Option B: Direct Code Customization
If you prefer hardcoding defaults directly into the codebase, open:
`src/app/api/orders/invoice/route.ts` (Lines 101–106):
```typescript
const companyGstin = process.env.COMPANY_GSTIN || 'YOUR_ACTUAL_GSTIN_HERE';
const companyCin = process.env.COMPANY_CIN || 'YOUR_ACTUAL_CIN_HERE';
const companyLegalName = process.env.COMPANY_LEGAL_NAME || 'Your Registered Legal Name';
const companyAddress = process.env.COMPANY_ADDRESS || 'Your Registered Office Address';
const companyBillingEmail = process.env.COMPANY_BILLING_EMAIL || 'billing@yourdomain.com';
```

### How Clients Access Invoices:
1. Client logs into `/dashboard/orders` or `/dashboard/billing`.
2. For any settled transaction, client clicks the **GST Tax Invoice** button.
3. A print-optimized window opens with interactive controls to toggle between **Intra-State** (CGST 9% + SGST 9%) and **Inter-State** (IGST 18%), and a 1-click **Print / Save as PDF** action.

---

## Step 4: Resend Email & Domain Verification

NovaMint dispatches branded emails for:
- Purchase confirmation & digital asset delivery
- Abandoned checkout recovery (automated every 30 mins)
- Account password resets

### 1. Resend Account Setup:
1. Sign up at [https://resend.com](https://resend.com).
2. Navigate to **API Keys** ➔ Click **Create API Key**.
3. Name it `novamint-production` with **Full Access**.
4. Set in your `.env.local` / Vercel:
   ```env
   RESEND_API_KEY=re_123456789...
   ```

### 2. Custom Domain Verification (Mandatory for Deliverability):
1. In Resend, go to **Domains** ➔ Click **Add Domain** (e.g. `novamintnetworks.in` or `novamint.in`).
2. Add the provided DNS records to your domain provider (Cloudflare, GoDaddy, Namecheap):
   - **DKIM (TXT)**: `resend._domainkey.yourdomain.com`
   - **SPF (MX/TXT)**: `feedback-smtp.resend.com` / `v=spf1 include:resend.com ~all`
   - **DMARC (TXT)**: `v=DMARC1; p=none;`
3. Click **Verify DNS Records** in Resend until status turns **Verified**.
4. Set your verified sender in `.env.local` / Vercel:
   ```env
   RESEND_FROM_EMAIL=orders@yourdomain.com
   ```

---

## Step 5: Supabase Auth, Google OAuth & Database

### 1. Supabase Dashboard Configuration:
1. Log into [https://supabase.com](https://supabase.com).
2. Go to **Project Settings** ➔ **API**:
   - `NEXT_PUBLIC_SUPABASE_URL`: e.g. `https://elmemolbipdsjppqcaux.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOi...`
   - `SUPABASE_SERVICE_ROLE_KEY`: `eyJhbGciOi...` *(Secret — never expose client-side)*

### 2. Google OAuth Provider:
1. Go to [Google Cloud Console](https://console.cloud.google.com/) ➔ **APIs & Services** ➔ **Credentials**.
2. Create an **OAuth 2.0 Client ID** (Web application).
3. Set **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `https://yourdomain.com`
4. Set **Authorized redirect URIs**:
   - `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
5. Copy the Client ID & Client Secret.
6. In **Supabase Dashboard** ➔ **Authentication** ➔ **Providers** ➔ **Google**:
   - Paste Client ID and Client Secret.
   - Toggle **Enable Google provider** to ON.
7. In **Supabase Dashboard** ➔ **Authentication** ➔ **URL Configuration**:
   - Set **Site URL**: `https://yourdomain.com`
   - Add to **Redirect URLs**:
     - `http://localhost:3000/api/auth/callback`
     - `https://yourdomain.com/api/auth/callback`
     - `http://localhost:3000/reset-password`
     - `https://yourdomain.com/reset-password`

---

## Step 6: Optional AI & Rate Limiting (Groq & Upstash)

### 1. Groq Cloud (AI Brief Generator & Copywriting)
- Get a free API key at [https://console.groq.com/keys](https://console.groq.com/keys).
- Model used: `llama-3.3-70b-versatile` (ultra-fast inference, zero cost on free tier).
- Set variable:
  ```env
  GROQ_API_KEY=gsk_your_groq_api_key
  ```
- *Fallback*: If omitted, NovaMint automatically falls back to curated heuristics and template generation with zero user downtime.

### 2. Upstash Redis (Distributed Rate Limiting)
- Get a free serverless Redis database at [https://upstash.com](https://upstash.com).
- Copy REST credentials:
  ```env
  UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
  UPSTASH_REDIS_REST_TOKEN=your_upstash_token
  ```
- *Fallback*: If omitted, NovaMint defaults to in-memory sliding-window rate limiting automatically.

---

## Master Environment Variables Reference

Create or verify `.env.local` for local development, and add these to **Vercel Project Settings ➔ Environment Variables**:

```env
# ─── App Configuration ────────────────────────────────────
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME="NovaMint Networks"
CRON_SECRET=generate_using_crypto_randomBytes_32

# ─── Supabase Database & Auth ──────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# ─── Cashfree Payment Gateway ──────────────────────────────
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
NEXT_PUBLIC_CASHFREE_MODE=production
CASHFREE_WEBHOOK_SECRET=your_cashfree_webhook_signing_secret

# ─── Transactional Emails (Resend) ─────────────────────────
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=orders@yourdomain.com

# ─── Indian GST & Invoicing ────────────────────────────────
COMPANY_GSTIN=07AABCN1234M1Z5
COMPANY_CIN=U72900DL2025PTC418920
COMPANY_LEGAL_NAME="NovaMint Networks Private Limited / NovaMint Studios"
COMPANY_ADDRESS="Level 5, Cyber Tech Park, DLF Cyber City, Sector 24, Gurugram / New Delhi, 122002"
COMPANY_BILLING_EMAIL=billing@novamint.in

# ─── Optional: Fast AI Generation (Groq) ───────────────────
GROQ_API_KEY=gsk_your_groq_api_key

# ─── Optional: Distributed Rate Limiting (Upstash) ─────────
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

---

## Pre-Launch Testing & Verification Checklist

Before opening public traffic, perform this end-to-end verification pass:

### 1. TypeScript & Build Check:
```bash
npx tsc --noEmit
npm run build
```
*Expected*: 0 errors, all 45 routes compile successfully.

### 2. Manual Cron Trigger Test:
```bash
curl -i -X GET "https://yourdomain.com/api/cron/recover-abandoned-checkouts" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```
*Expected*: HTTP 200 with JSON payload `{ "processed": 0 }` or `{ "success": true, "recoveredEmailsSent": ... }`.

### 3. Cashfree Checkout & Webhook Test:
1. Add any service or digital product to cart and proceed to `/checkout`.
2. Fill details and click **Pay with Cashfree PG**.
3. In Sandbox mode, use a test UPI or Test NetBanking.
4. Verify redirection to `/checkout/success?order_id=<UUID>`.
5. Check your Supabase database: `orders.status` should be `paid`.
6. Verify Cashfree Webhooks log in Cashfree Dashboard shows HTTP 200 for `/api/webhooks/cashfree`.

### 4. Tax Invoice Download Test:
1. Visit `https://yourdomain.com/api/orders/invoice?order_id=<ORDER_UUID>`.
2. Verify:
   - Your GSTIN and Company CIN appear in the header.
   - Taxable amount (Total / 1.18) and CGST (9%) + SGST (9%) or IGST (18%) sum up correctly.
   - Click **Print / Save as PDF** to verify standard A4 print margins.

### 5. GitHub Actions Cron Verification:
1. Visit your GitHub Repository ➔ **Actions** ➔ **Cron - Abandoned Checkout Recovery**.
2. Click **Run workflow**.
3. Confirm green checkmark `(Success)`.

---

🎉 **Your NovaMint Networks platform is fully configured, secured, and ready for high-ticket client acquisition!**
