
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function check() {
  const admin = await prisma.admin.findUnique({
    where: { username: "admin" },
  });

  if (!admin) {
    console.log("No admin user found in DB!");
  } else {
    console.log("Admin user found:", admin.username);
    const match = await bcrypt.compare("admin123", admin.passwordHash);
    console.log("Password 'admin123' match:", match);
    console.log("Hash in DB:", admin.passwordHash);
  }
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
