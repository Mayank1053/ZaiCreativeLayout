import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding project phases demonstration...");

  // Ensure Commercial category exists
  let commercial = await prisma.category.findUnique({
    where: { slug: "commercial" },
  });

  if (!commercial) {
    commercial = await prisma.category.create({
      data: {
        name: "Commercial",
        slug: "commercial",
        description: "Office buildings and retail spaces",
      },
    });
    console.log("Created Commercial category");
  }

  const slug = "skyline-heights-complex";

  // Check if project exists and delete it to re-seed cleanly
  const existing = await prisma.project.findUnique({
    where: { slug },
  });

  if (existing) {
    console.log(`Deleting existing project ${slug}...`);
    await prisma.project.delete({ where: { slug } });
  }

  console.log("Creating new project with phases...");

  const project = await prisma.project.create({
    data: {
      title: "Skyline Heights Complex",
      slug,
      description: "A state-of-the-art commercial complex designed to redefine the city skyline. This 12-story structure features premium office spaces, a retail podium, and sustainable architecture. The design emphasizes natural light, energy efficiency, and modern aesthetics.",
      location: "Financial District, Raipur",
      direction: "North-East",
      vastuNotes: "Entrance positioned North-East for maximum prosperity. Water features in the North zone.",
      images: JSON.stringify([
        "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg", // Building exterior
        "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg", // Interior
      ]),
      featured: true,
      categoryId: commercial.id,
      phases: {
        create: [
          {
            title: "Site Inspection & Soil Testing",
            date: new Date("2024-01-15"),
            description: "Initial site survey and soil bearing capacity tests conducted. Results confirmed suitability for high-rise structure.",
            images: [
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg", // Surveying
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg" // Soil
            ],
            order: 0
          },
          {
            title: "Excavation & Foundation",
            date: new Date("2024-03-10"),
            description: "Deep excavation for triple-basement parking. Raft foundation pouring completed with high-grade concrete.",
            images: [
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg", // Excavation
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg"  // Rebar
            ],
            order: 1
          },
          {
            title: "Structural Work - Podium Level",
            date: new Date("2024-06-20"),
            description: "Completion of basement levels and casting of the ground floor podium slab. Column reinforcement in progress.",
            images: [
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg", // Structure
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg" // Concrete
            ],
            order: 2
          },
          {
            title: "Superstructure Construction",
            date: new Date("2024-09-05"),
            description: "Rapid rise of the tower floors. Currently casting the 6th-floor slab. Brickwork initiated on lower floors.",
            images: [
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg", // Crane/High rise
            ],
            order: 3
          },
          {
            title: "Facade & Glazing",
            date: new Date("2025-01-12"),
            description: "Installation of the glass curtain wall system. Energy-efficient double-glazed units being mounted.",
            images: [
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg", // Glass facade
            ],
            order: 4
          },
          {
            title: "Interiors & Finishing",
            date: null, // Ongoing/Future
            description: "Interior fit-outs have begun for the lobby and common areas. HVAC ducting and electrical wiring in final stages.",
            images: [
              "https://i.ibb.co/PZzLgBNb/Whats-App-Image-2026-02-14-at-22-22-05.jpg", // Construction interior
            ],
            order: 5
          }
        ]
      }
    },
    include: {
      phases: true
    }
  });

  console.log(`Created project: ${project.title} with ${project.phases.length} phases.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
