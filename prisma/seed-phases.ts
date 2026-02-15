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
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Building exterior
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", // Interior
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
              "https://images.unsplash.com/photo-1581094794329-cd56b50932da?q=80&w=2070&auto=format&fit=crop", // Surveying
              "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=2064&auto=format&fit=crop" // Soil
            ],
            order: 0
          },
          {
            title: "Excavation & Foundation",
            date: new Date("2024-03-10"),
            description: "Deep excavation for triple-basement parking. Raft foundation pouring completed with high-grade concrete.",
            images: [
              "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop", // Excavation
              "https://images.unsplash.com/photo-1590059390047-6058a0650e8b?q=80&w=2000&auto=format&fit=crop"  // Rebar
            ],
            order: 1
          },
          {
            title: "Structural Work - Podium Level",
            date: new Date("2024-06-20"),
            description: "Completion of basement levels and casting of the ground floor podium slab. Column reinforcement in progress.",
            images: [
              "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2144&auto=format&fit=crop", // Structure
              "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop" // Concrete
            ],
            order: 2
          },
          {
            title: "Superstructure Construction",
            date: new Date("2024-09-05"),
            description: "Rapid rise of the tower floors. Currently casting the 6th-floor slab. Brickwork initiated on lower floors.",
            images: [
              "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop", // Crane/High rise
            ],
            order: 3
          },
          {
            title: "Facade & Glazing",
            date: new Date("2025-01-12"),
            description: "Installation of the glass curtain wall system. Energy-efficient double-glazed units being mounted.",
            images: [
              "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2074&auto=format&fit=crop", // Glass facade
            ],
            order: 4
          },
          {
            title: "Interiors & Finishing",
            date: null, // Ongoing/Future
            description: "Interior fit-outs have begun for the lobby and common areas. HVAC ducting and electrical wiring in final stages.",
            images: [
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop", // Construction interior
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
