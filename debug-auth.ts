
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
    
    // Check provided argument
    if (process.argv[2]) {
      const argMatch = await bcrypt.compare(process.argv[2], admin.passwordHash);
      console.log(`Password '${process.argv[2]}' (CLI arg) match:`, argMatch);
    }

    const match = await bcrypt.compare("admin123", admin.passwordHash);
    console.log("Password 'admin123' (default) match:", match);

    if (process.env.ADMIN_PASSWORD) {
      const envMatch = await bcrypt.compare(process.env.ADMIN_PASSWORD, admin.passwordHash);
      console.log("Password from ADMIN_PASSWORD env match:", envMatch);
    }
    
    console.log("Hash in DB:", admin.passwordHash);
  }
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
