
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function reset() {
  const passwordHash = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: { passwordHash: passwordHash },
    create: {
      username: "admin",
      passwordHash: passwordHash,
    },
  });

  console.log("Admin password reset to 'admin123'");
  console.log("New hash:", admin.passwordHash);
}

reset()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
