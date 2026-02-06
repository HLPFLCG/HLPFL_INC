# API Integration Guide

Complete guide for adding backend APIs to power the HLPFL INC dashboard, client management, and dynamic features.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Backend Options](#backend-options)
3. [Authentication Setup](#authentication-setup)
4. [Client Management API](#client-management-api)
5. [Dashboard Data API](#dashboard-data-api)
6. [File Upload API](#file-upload-api)
7. [Payment Integration](#payment-integration)
8. [Email & Notifications](#email--notifications)
9. [Database Schema](#database-schema)
10. [Deployment Considerations](#deployment-considerations)

---

## Architecture Overview

### Current State (Static)

The site currently uses:
- Static export (`output: "export"`)
- Session storage for demo auth
- No backend database

### Target State (Dynamic)

To add real APIs, you'll need:
- Backend server (Next.js API routes, separate backend, or serverless)
- Database (PostgreSQL, MongoDB, etc.)
- Authentication provider (NextAuth, Clerk, Auth0)
- File storage (Cloudflare R2, AWS S3)

### Recommended Stack

| Layer | Recommended | Alternatives |
|-------|-------------|--------------|
| Backend | Next.js API Routes | Express, Fastify, Hono |
| Database | PostgreSQL + Prisma | MongoDB, Supabase, PlanetScale |
| Auth | NextAuth.js | Clerk, Auth0, Supabase Auth |
| File Storage | Cloudflare R2 | AWS S3, Uploadthing |
| Email | Resend | SendGrid, Postmark |
| Payments | Stripe | Paddle, LemonSqueezy |

---

## Backend Options

### Option 1: Next.js API Routes (Recommended)

Convert from static export to server-side rendering.

**Step 1:** Update `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  // Remove: output: "export"
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.cloudflare.com" },
    ],
  },
};
```

**Step 2:** Create API routes in `src/app/api/`:

```
src/app/api/
├── auth/
│   ├── login/route.ts
│   ├── logout/route.ts
│   └── register/route.ts
├── clients/
│   ├── route.ts          # GET all, POST new
│   └── [id]/route.ts     # GET, PUT, DELETE single
├── projects/
│   ├── route.ts
│   └── [id]/route.ts
└── analytics/
    └── route.ts
```

**Step 3:** Example API route:

```ts
// src/app/api/clients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clients = await prisma.client.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const client = await prisma.client.create({
    data: {
      ...body,
      userId: session.user.id,
    },
  });

  return NextResponse.json(client, { status: 201 });
}
```

### Option 2: Separate Backend API

Keep the frontend static and use a separate API server.

**Create API base URL config:**
```ts
// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hlpfl.org";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Usage
export const clientsApi = {
  getAll: () => apiClient<Client[]>("/clients"),
  getById: (id: string) => apiClient<Client>(`/clients/${id}`),
  create: (data: CreateClientDto) =>
    apiClient<Client>("/clients", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: UpdateClientDto) =>
    apiClient<Client>(`/clients/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiClient<void>(`/clients/${id}`, { method: "DELETE" }),
};
```

### Option 3: Cloudflare Workers (Serverless)

Use Cloudflare Workers for API endpoints alongside Pages.

```ts
// functions/api/clients.ts (Cloudflare Pages Functions)
import { D1Database } from "@cloudflare/workers-types";

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { results } = await context.env.DB
    .prepare("SELECT * FROM clients ORDER BY created_at DESC")
    .all();

  return Response.json(results);
};
```

---

## Authentication Setup

### NextAuth.js Setup

**Step 1:** Install dependencies:
```bash
npm install next-auth @auth/prisma-adapter
```

**Step 2:** Create auth configuration:

```ts
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/portal/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
```

**Step 3:** Create API route:

```ts
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

**Step 4:** Update AuthContext to use NextAuth:

```tsx
// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        isLoading: status === "loading",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

---

## Client Management API

### Data Model

```ts
// src/types/client.ts
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  type: "inventor" | "musician" | "artist" | "designer" | "writer";
  status: "lead" | "active" | "inactive" | "completed";
  services: string[];
  notes?: string;
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientDto {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  type: Client["type"];
  services: string[];
  notes?: string;
}
```

### API Endpoints

```ts
// src/app/api/clients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const createClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  type: z.enum(["inventor", "musician", "artist", "designer", "writer"]),
  services: z.array(z.string()),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");

  const where: any = { userId: session.user.id };
  if (status) where.status = status;
  if (type) where.type = type;

  const clients = await prisma.client.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      projects: { select: { id: true, title: true, status: true } },
    },
  });

  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validated = createClientSchema.parse(body);

  const client = await prisma.client.create({
    data: {
      ...validated,
      userId: session.user.id,
      status: "lead",
      revenue: 0,
    },
  });

  return NextResponse.json(client, { status: 201 });
}
```

### React Hook for Clients

```ts
// src/hooks/useClients.ts
import { useState, useEffect } from "react";
import { Client, CreateClientDto } from "@/types/client";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      if (!response.ok) throw new Error("Failed to fetch clients");
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const createClient = async (data: CreateClientDto) => {
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create client");

    const newClient = await response.json();
    setClients((prev) => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = async (id: string, data: Partial<Client>) => {
    const response = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update client");

    const updated = await response.json();
    setClients((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  const deleteClient = async (id: string) => {
    const response = await fetch(`/api/clients/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete client");
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    isLoading,
    error,
    createClient,
    updateClient,
    deleteClient,
    refetch: fetchClients,
  };
}
```

---

## Dashboard Data API

### Analytics Endpoint

```ts
// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "30d";

  const startDate = getStartDate(period);

  const [clients, projects, revenue] = await Promise.all([
    prisma.client.count({
      where: { userId: session.user.id, createdAt: { gte: startDate } },
    }),
    prisma.project.findMany({
      where: { userId: session.user.id, createdAt: { gte: startDate } },
      select: { status: true, revenue: true },
    }),
    prisma.transaction.aggregate({
      where: { userId: session.user.id, createdAt: { gte: startDate } },
      _sum: { amount: true },
    }),
  ]);

  const analytics = {
    newClients: clients,
    activeProjects: projects.filter((p) => p.status === "active").length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
    totalRevenue: revenue._sum.amount || 0,
    revenueByMonth: await getRevenueByMonth(session.user.id, startDate),
  };

  return NextResponse.json(analytics);
}

function getStartDate(period: string): Date {
  const now = new Date();
  switch (period) {
    case "7d": return new Date(now.setDate(now.getDate() - 7));
    case "30d": return new Date(now.setDate(now.getDate() - 30));
    case "90d": return new Date(now.setDate(now.getDate() - 90));
    case "1y": return new Date(now.setFullYear(now.getFullYear() - 1));
    default: return new Date(now.setDate(now.getDate() - 30));
  }
}
```

### Dashboard Component Integration

```tsx
// src/app/portal/page.tsx (updated)
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardData {
  newClients: number;
  activeProjects: number;
  totalRevenue: number;
  revenueByMonth: { month: string; amount: number }[];
}

export default function PortalDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/analytics?period=30d");
        const analytics = await response.json();
        setData(analytics);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchDashboard();
  }, [user]);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div>
      {/* Render dashboard with real data */}
    </div>
  );
}
```

---

## File Upload API

### Cloudflare R2 Setup

```ts
// src/lib/r2.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFile(file: File, folder: string = "uploads") {
  const key = `${folder}/${Date.now()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: file.type,
  });

  const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });

  await fetch(signedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

export async function deleteFile(key: string) {
  await r2.send(new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  }));
}
```

### Upload API Route

```ts
// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/r2";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const url = await uploadFile(file, `users/${session.user.id}`);

  return NextResponse.json({ url });
}
```

---

## Payment Integration

### Stripe Webhooks

```ts
// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    case "invoice.paid":
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaid(invoice);
      break;
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  await prisma.transaction.create({
    data: {
      stripeId: session.id,
      amount: session.amount_total! / 100,
      status: "completed",
      userId: session.metadata?.userId,
      clientId: session.metadata?.clientId,
    },
  });
}
```

---

## Email & Notifications

### Resend Setup

```ts
// src/lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: "HLPFL <noreply@hlpfl.org>",
    to,
    subject,
    html,
  });
}

export async function sendWelcomeEmail(user: { email: string; name: string }) {
  return sendEmail({
    to: user.email,
    subject: "Welcome to HLPFL!",
    html: `
      <h1>Welcome, ${user.name}!</h1>
      <p>Thank you for joining HLPFL. We're excited to help you grow.</p>
      <a href="https://hlpfl.org/portal">Access Your Portal</a>
    `,
  });
}
```

---

## Database Schema

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?
  role          String    @default("user")
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  clients       Client[]
  projects      Project[]
  transactions  Transaction[]
}

model Client {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  company   String?
  type      String
  status    String   @default("lead")
  services  String[]
  notes     String?
  revenue   Float    @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  projects  Project[]
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String   @default("pending")
  type        String
  revenue     Float    @default(0)
  startDate   DateTime?
  endDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  clientId    String
  client      Client   @relation(fields: [clientId], references: [id], onDelete: Cascade)
}

model Transaction {
  id        String   @id @default(cuid())
  stripeId  String?  @unique
  amount    Float
  status    String
  type      String   @default("payment")
  createdAt DateTime @default(now())

  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  clientId  String?
}

// NextAuth.js models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## Deployment Considerations

### Environment Variables

```env
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://hlpfl.org"
NEXTAUTH_SECRET="your-secret-key"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudflare R2
R2_ENDPOINT="https://..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="hlpfl-uploads"
R2_PUBLIC_URL="https://cdn.hlpfl.org"

# Email
RESEND_API_KEY="re_..."
```

### Switching from Static to SSR

1. Remove `output: "export"` from `next.config.ts`
2. Update Cloudflare Pages build settings or deploy to Cloudflare Workers
3. Add database connection
4. Run migrations: `npx prisma migrate deploy`

### Cloudflare Workers Deployment

For SSR on Cloudflare, use the `@cloudflare/next-on-pages` adapter:

```bash
npm install @cloudflare/next-on-pages
```

Update `wrangler.toml`:
```toml
name = "hlpfl-inc"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[vars]
NEXTAUTH_URL = "https://hlpfl.org"
```

Build and deploy:
```bash
npx @cloudflare/next-on-pages
wrangler pages deploy .vercel/output/static
```
