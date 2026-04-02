# AI Build Instructions: Creative Layout Studio

This document serves as a comprehensive Product Requirements Document (PRD) and technical specification for AI agents tasked with rebuilding or understanding the "Creative Layout - Architecture & Construction Studio" web application.

## 1. Project Overview

**Name**: Creative Layout
**Concept**: A high-performance portfolio, enquiry management, and admin dashboard application for an architecture and construction firm.
**Design Aesthetic**: "Refined Architectural", featuring a premium dark theme (styled as dark architectural blueprint), high-contrast typography, asymmetrical layouts, and subtle, smooth animations.

### Core Features

- **Public Portfolio**: Showcase projects, phases, services, and company information.
- **Service Enquiries**: A contact form capturing client requests (Architecture, Construction, Vastu) complete with email notifications.
- **Admin Dashboard**: Protected routes for content management (Projects, Categories, Phases, Enquiries, Settings).
- **Dynamic Content**: Data driven UI fetching heavily from a PostgreSQL database.

---

## 2. Technology Stack

To ensure exact parity with the original project, use the following core technologies:

### Framework & Runtime

- **Runtime & Package Manager**: [Bun](https://bun.sh/) (REQUIRED: _Always use bun instead of npm_)
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript

### Styling & UI

- **CSS Framework**: Tailwind CSS 4
- **Component Library**: shadcn/ui (Radix UI primitives underneath)
- **Animations**: Framer Motion (page transitions, micro-interactions, stagger effects) & embla-carousel-react (for image sliders)
- **Icons**: Lucide React

### Backend & Database

- **Database**: PostgreSQL
- **ORM**: Prisma Client & Prisma Migrate
- **Authentication**: NextAuth.js (v4) configured for Credentials provider (Admin username/password hash)
- **File Uploads**: Cloudinary (next-cloudinary) for image handling
- **Mailing**: Nodemailer for enquiry alerts

---

## 3. Database Schema (Prisma)

The application centers around the following data models. An AI agent should generate the Prisma schema closely following this structure:

### `Admin`

- Uses `id`, `username` (unique), `passwordHash`, `createdAt`, `updatedAt`
- Secures the `/admin` routes.

### `Category`

- Uses `id`, `name` (unique), `slug` (unique), `description`.
- Categorizes projects (e.g., Residential, Commercial).

### `Project`

- Uses `id`, `title`, `slug` (unique), `description`, `location`, `direction` (e.g., North facing), `vastuNotes`, `images` (stringified JSON array of URLs), `featured` (boolean), `categoryId`.
- Represents a completed or ongoing architectural project.

### `ProjectPhase`

- Uses `id`, `title`, `date` (optional), `description`, `images` (String[] native PG array), `order` (integer), `projectId` (Cascade delete).
- Represents individual construction or design phases (e.g., "Foundation", "Interior Setup").

### `Enquiry`

- Uses `id`, `name`, `email`, `phone`, `message`, `services` (String[]), `handled` (boolean).
- Captures contact form submissions.

### `SiteConfig`

- Uses `id`, `key` (unique), `value`, `description`.
- Stores dynamic branding inputs (e.g., brand name, tagline).

---

## 4. Application Architecture & Routing

The Next.js App Router structure should be implemented as follows:

### `src/app/`

- `(public)/` or Root Group:
  - `/` (Home): Hero section, featured projects, architectural aesthetic.
  - `/projects`: Grid of categorized projects with filtering.
  - `/projects/[slug]`: Detailed project view with phases and carousels.
  - `/contact`: Service enquiry form.
  - `/process`: Explanation of the studio's workflow.
- `api/`:
  - `/api/auth/[...nextauth]`: NextAuth credentials configuration.
  - `/api/upload`: Cloudinary signature generation/handling.
- `admin/`:
  - `/admin/login`: Unprotected login route.
  - `/admin/dashboard`: Overview metrics.
  - `/admin/projects`: CRUD interface for Projects and Phases.
  - `/admin/enquiries`: Viewing and toggling the `handled` status of leads.

### `src/components/`

- `ui/`: Raw shadcn/ui components (Buttons, Inputs, Dialogs, Toasts, Forms, etc.).
- `shared/`: Global layout elements (Navbar, Footer, Logo, ThemeProvider).
- `home/`: Sections specific to the homepage (Hero, FeaturedProjects, ServicesOverview).
- `projects/`: Project cards, Phase timeline displays.
- `admin/`: Admin sidebar, data tables, forms for creation/editing.

---

## 5. Design & Aesthetic Rules

When generating the actual React code `.tsx` and styling, follow these strict rules to ensure high design quality:

1. **Aesthetic Direction**: "Dark Architectural Blueprint". Use dark themes (slate/zinc/black base) interwoven with fine, precise lines, geometric elements, and subtle high-contrast accents (e.g., glowing cyan or muted gold).
2. **Typography**: Do not use generic fonts (Arial, Inter). Pair a distinctive, structured display font (e.g., Space Grotesk, Syne, or a refined serif) with a clean sans-serif body font.
3. **Motion**: Use `framer-motion` strategically. Focus on high-impact page load reveals (staggered fade-up, viewport-triggered layout shifts) rather than bouncy, chaotic animations. Elegance is key.
4. **Spacing & Layout**: Do not adhere strictly to simple centered boxes. Allow elements to overlap slightly, use asymmetry, and provide generous negative space to cultivate a "luxury studio" feel.
5. **UI Consistency**: Ensure all interactive elements (hover states, focus rings, custom cursors if implemented) behave consistently with the 'blueprint' theme. Use `tailwindcss-animate` and `clsx`/`tailwind-merge` (standard in shadcn) heavily.

---

## 6. Deployment & Environment

The application relies heavily on proper environment variables. The `.env` template provided to agents should include:

- `DATABASE_URL` (PostgreSQL)
- `NEXTAUTH_SECRET` & `NEXTAUTH_URL`
- `EMAIL_USER` & `EMAIL_PASS` (Nodemailer config)
- `ADMIN_USERNAME` & `ADMIN_PASSWORD` (Initial setup)
- `NEXT_PUBLIC_CLOUDINARY_*` and `CLOUDINARY_API_SECRET`

**Build Process**: The project is built using `next build` and exported optionally as standalone for Docker/VPS deployments, utilizing a custom `server.js` wrapper if necessary (as seen in the original `package.json` scripts).
