
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function reset() {
  const password = process.argv[2] || process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: { passwordHash: passwordHash },
    create: {
      username: "admin",
      passwordHash: passwordHash,
    },
  });

  console.log("Admin password reset successfully.");
  if (process.argv[2]) {
    console.log("Password set from command line argument.");
  } else if (process.env.ADMIN_PASSWORD) {
    console.log("Password set from ADMIN_PASSWORD env var.");
  } else {
    console.log("Password set to default: 'admin123'.");
    console.log("Usage: bun reset-admin.ts <new_password>");
  }
  
  console.log("New hash stored in DB:", admin.passwordHash);
}

reset()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
