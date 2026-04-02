# Creative Layout - Architecture & Construction Studio

A refined, high-performance portfolio and management website for an Architecture & Construction studio. Built with modern web technologies to showcase projects, manage enquiries, and provide a premium user experience.

![Project Banner](https://i.ibb.co/WNx5W3P1/Creative-Logo.png) _<!-- Replace with actual banner if available -->_

## ✨ Features

### 🎨 Frontend (Public)

- **Premium Aesthetic**: "Refined Architectural" design with bold typography, asymmetrical layouts, and subtle animations.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Portfolio Showcase**: Detailed project pages with image galleries, location details, Vastu directions, and categorization.
- **Service Enquiries**: Interactive contact form with service selection (Architecture, Construction, Vastu).
- **Dark/Light Mode**: Seamless theme switching for optimal viewing.

### ⚙️ Backend & Admin

- **Secure Admin Panel**: Protected dashboard for managing content.
- **Project Management**: Create, update, and delete projects with rich details and image uploads (Cloudinary).
- **Enquiry Management**: View and track client enquiries directly from the dashboard.
- **Email Notifications**: Automated email alerts for new enquiries via Nodemailer.
- **Content Management**: Dynamic category and site configuration management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) / Custom Auth
- **Image Storage**: Cloudinary
- **Email**: Nodemailer
- **Runtime**: [Bun](https://bun.sh/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Bun](https://bun.sh/)
- [PostgreSQL](https://www.postgresql.org/) (Local or hosted like Neon/Supabase/Prisma)

### 1. Clone the repository

```bash
git clone <repository-url>
cd ZaiCreativeLayout
```

### 2. Install dependencies

```bash
bun install
```

### 3. Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/creative_layout_db"

# Email Configuration (for enquiry notifications)
EMAIL_USER=""
EMAIL_PASS=""

# JWT Authentication
ADMIN_USERNAME="admin"
ADMIN_PASSWORD=""
JWT_SECRET=""

# Brand Configuration
BRAND_NAME=""
BRAND_TAGLINE=""
LOGO_IMAGE_URL=""

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### 4. Database Setup

Push the schema to your database and generate the Prisma client:

```bash
bun run db:push
bun run db:generate
```

### 5. Seed the Database

Populate the database with initial categories and admin user:

```bash
bun run prisma/seed.ts
```

### 6. Run the Application

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛡️ Admin Access

To access the admin panel, navigate to `/admin/login`.

**Resetting Admin Password:**
If you need to create or reset the admin administrator credentials, use the provided utility script:

```bash
bun reset-admin.ts <new-password>
```

_Note: Make sure your `.env` is configured correctly before running this script._

## 📂 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication routes
│   ├── (public)/        # Public website pages (Home, Projects, Contact)
│   ├── admin/           # Admin dashboard routes
│   └── api/             # Backend API functionality
├── components/
│   ├── ui/              # Reusable UI components (Shadcn)
│   ├── projects/        # Project-related components
│   └── shared/          # Shared layout components (Header, Footer)
├── lib/                 # Utilities, Database client, Auth
└── prisma/
    ├── schema.prisma    # Database schema definition
    └── seed.ts          # Database seeding script
```

## 📜 Scripts

- `bun run dev`: Start development server.
- `bun run build`: Build for production.
- `bun run start`: Start production server.
- `bun run db:push`: Push local schema to database.
- `bun run db:migrate`: Create and apply migrations.

---
