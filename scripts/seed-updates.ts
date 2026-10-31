import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding studio updates...');

  // Find Skyline Heights project if available
  const skylineProject = await prisma.project.findFirst({
    where: { slug: 'skyline-heights-complex' },
  });

  // 1. Celebratory update (Happy Diwali)
  const diwaliUpdate = await prisma.update.upsert({
    where: { slug: 'happy-diwali-festive-greetings' },
    update: {},
    create: {
      title: 'Happy Diwali & Warm Festive Greetings from Creative Layout',
      slug: 'happy-diwali-festive-greetings',
      category: 'Celebrations & Greetings',
      excerpt:
        'May this festival of lights illuminate your homes with prosperity, good health, and timeless architectural elegance. Warmest wishes from Head Architect Prashant Ambilkar and our entire studio team.',
      coverImage: 'https://images.unsplash.com/photo-1576082869376-78b17849c719?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1576082869376-78b17849c719?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?auto=format&fit=crop&w=1200&q=80',
      ],
      content: `
# Lighting Up Spaces, Enriching Lives

On this auspicious festival of lights, **Creative Layout** extends heartfelt greetings to our valued clients, construction partners, and patrons across Chhattisgarh.

Every home we design and every structure we build is rooted in the belief that space should not just shelter bodies, but nurture souls. As the diyas illuminate darkness, may your homes radiate joy, harmony, and peace.

> *"A house is made of bricks and beams; a home is crafted from hope and dreams."*

### Festive Studio Timings
- **Studio Consultations:** Our Raipur design office will observe Diwali holidays from November 1 to November 4.
- **Site Progress & Emergency Operations:** Site management teams remain on call for critical curing cycles.
- Regular architectural consultations will resume on **November 5**.

May Lord Ganesha bless you with wisdom, and Goddess Lakshmi bestow abundance upon your family!
      `.trim(),
      published: true,
      featured: true,
      publishedAt: new Date(),
    },
  });

  // 2. Site Progress Update (Project & Site Work)
  const siteUpdate = await prisma.update.upsert({
    where: { slug: 'skyline-heights-slab-casting-milestone' },
    update: {},
    create: {
      title: 'Skyline Heights Complex: 8th Floor Slab Casting Complete',
      slug: 'skyline-heights-slab-casting-milestone',
      category: 'Project & Site Work',
      excerpt:
        'Major structural milestone reached at the Financial District site as our turnkey engineering team completes the 8th-floor concrete pour with high-grade M30 mix.',
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      ],
      content: `
# Structural Progress Report: Skyline Heights

We are thrilled to share an on-site milestone from our marquee commercial development, **Skyline Heights Complex** in Raipur. 

Our on-site engineering team has successfully executed the concrete casting for the **8th floor superstructure**, covering over 9,500 sq. ft. of floor plate in a single continuous 14-hour operation.

## Key Engineering Parameters
- **Concrete Grade:** High-performance M30 design mix with waterproofing plasticizers.
- **Reinforcement:** Fe550D TMT bars with strict cover block spacing checks.
- **Curing Protocol:** Chemical curing membrane followed by ponding curing for 14 continuous days.
- **Quality Audit:** Cube sample strength tests conducted by certified third-party testing laboratories.

### What Lies Ahead
With the 8th floor complete, masonry block work has initiated on the lower 3 commercial retail podium levels. MEP (Mechanical, Electrical, and Plumbing) ducting installations will follow in sequence.
      `.trim(),
      projectId: skylineProject?.id || null,
      published: true,
      featured: false,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  });

  // 3. Design & Layout Concept Release
  const layoutUpdate = await prisma.update.upsert({
    where: { slug: 'modern-4bhk-vastu-layout-concept' },
    update: {},
    create: {
      title: 'New Modern 4BHK Vastu-Compliant Floor Layout Concept',
      slug: 'modern-4bhk-vastu-layout-concept',
      category: 'Design & Layout',
      excerpt:
        'Explore our latest 2,400 sq. ft. contemporary residential layout featuring open-to-sky courtyard ventilation, optimized North-East Brahmasthan energy flow, and private terrace zoning.',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      ],
      content: `
# Rethinking Modern Living: The 4BHK Courtyard Villa Concept

How do you combine contemporary minimalist architecture with sacred ancient Vastu Shastra principles? Our design team presents the **Vayu & Tejas 4BHK Layout Concept**.

Designed for a standard 40x60 ft. residential plot in Raipur, this layout demonstrates how spatial orientation directly affects thermal comfort and peace of mind.

## Architectural Highlights

### 1. North-East Water & Light Ingress
The master entrance opens into an illuminated foyer in the auspicious Ishanya (North-East) quadrant. Large floor-to-ceiling double-glazed apertures invite gentle morning sunlight while keeping out Raipur's afternoon heat.

### 2. Central Brahmasthan Courtyard
Rather than packing the center with dark corridors, we designed an open atrium that functions as the lungs of the home. Hot air naturally rises through clerestory louvers, reducing air conditioning load by up to 28%.

### 3. Kitchen in the Agni (South-East) Corner
The culinary workspace occupies the South-East corner with uninterrupted ventilation and direct access to an outdoor utility yard.

> Want this layout customized for your plot dimensions? Contact our architectural team to book an in-person design consultation.
      `.trim(),
      published: true,
      featured: false,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('Seeded updates successfully:', [
    diwaliUpdate.title,
    siteUpdate.title,
    layoutUpdate.title,
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
