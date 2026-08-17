# ToriHub24 Monorepo

ToriHub24 is a high-performance online social community platform built on a modern monorepo stack using Next.js App Router, Turborepo, pnpm workspaces, and Prisma.

## 🏗️ Tech Stack & Architecture

- **Framework:** Next.js (App Router, Server Actions)
- **Monorepo Engine:** [Turborepo](https://turbo.build/)
- **Package Manager:** `pnpm` Workspaces
- **Database & ORM:** PostgreSQL + Prisma (`@torihub/db`)
- **UI & Styling:** Tailwind CSS + Shared Component Package (`@torihub/ui`)
- **Design Pattern:** Feature-Based Domain-Driven Design (DDD)

---

## 📁 Repository Structure

```text
ToriHub24/
├── apps/
│   └── web/                   # Main Next.js web application
│       └── src/
│           ├── app/           # App Router routes and pages
│           ├── features/      # Domain modules (isolated features)
│           │   ├── auth/      # Auth Server Actions, Forms, Session hooks
│           │   ├── posts/     # Feed UI, Post mutations, Like hooks
│           │   └── profile/   # Profile pages, Bio updates, User feeds
│           └── lib/           # Shared web utilities and constants
├── packages/
│   ├── db/                    # Shared Prisma client, migrations & schema
│   ├── ui/                    # Shared UI component library
│   └── tsconfig/              # Shared TypeScript configurations
├── .github/
│   └── workflows/             # CI/CD pipelines (Lint, Type-check, Build)
├── pnpm-workspace.yaml        # Workspace configuration
└── turbo.json                 # Turborepo task pipeline definition