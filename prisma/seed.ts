// Database seed script for Creative Layout
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "admin" },
  });

  if (!existingAdmin) {
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.admin.create({
      data: {
        username: "admin",
        passwordHash: passwordHash,
      },
    });
    console.log(`Admin user created with username: admin`);
    if (process.env.ADMIN_PASSWORD) {
      console.log("Password set from ADMIN_PASSWORD env var");
    } else {
      console.log("Password set to default: admin123 (Set ADMIN_PASSWORD in .env to change)");
    }
  } else {
    console.log("Admin user already exists");
  }

  // Create categories
  const categories = [
    {
      name: "Residential",
      slug: "residential",
      description: "Private homes, apartments, and residential complexes",
    },
    {
      name: "Commercial",
      slug: "commercial",
      description: "Office buildings, retail spaces, and commercial properties",
    },
    {
      name: "Industrial",
      slug: "industrial",
      description: "Factories, warehouses, and industrial facilities",
    },
    {
      name: "Landscape",
      slug: "landscape",
      description: "Gardens, parks, and outdoor spaces",
    },
  ];

  for (const category of categories) {
    const existing = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!existing) {
      await prisma.category.create({ data: category });
      console.log(`Category created: ${category.name}`);
    }
  }

  // Create sample projects
  const residentialCategory = await prisma.category.findUnique({
    where: { slug: "residential" },
  });

  if (residentialCategory) {
    const existingProjects = await prisma.project.count();
    
    if (existingProjects === 0) {
      const sampleProjects = [
        {
          title: "Modern Villa Raipur",
          slug: "modern-villa-raipur",
          description: "A stunning contemporary villa designed with clean lines and open spaces. This 5,000 sq ft residence features a seamless blend of indoor and outdoor living, with vastu-compliant orientation facing East. The design incorporates sustainable materials and passive cooling techniques suited for the Chhattisgarh climate.",
          location: "Raipur, Chhattisgarh",
          direction: "East",
          vastuNotes: "Main entrance faces East, master bedroom in Southwest, kitchen in Southeast. Fully vastu-compliant layout.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
          ]),
          featured: true,
          categoryId: residentialCategory.id,
        },
        {
          title: "Serene Lake House",
          slug: "serene-lake-house",
          description: "A peaceful lakeside retreat designed for relaxation and connection with nature. The house features floor-to-ceiling windows that frame the water views, natural stone exteriors, and warm wood interiors.",
          location: "Naya Raipur, Chhattisgarh",
          direction: "North",
          vastuNotes: "North-facing entrance for prosperity. Water element enhanced by lake proximity.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
          ]),
          featured: true,
          categoryId: residentialCategory.id,
        },
        {
          title: "Urban Townhouse",
          slug: "urban-townhouse",
          description: "A sophisticated urban townhouse that maximizes space while maintaining a sense of openness. Features a rooftop garden and innovative storage solutions.",
          location: "Civil Lines, Raipur",
          direction: "South",
          vastuNotes: "South-facing with proper ventilation adjustments. Vastu remedies incorporated.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200",
          ]),
          featured: false,
          categoryId: residentialCategory.id,
        },
      ];

      for (const project of sampleProjects) {
        await prisma.project.create({ data: project });
        console.log(`Project created: ${project.title}`);
      }
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
