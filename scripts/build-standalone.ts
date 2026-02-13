import { cp, mkdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";

async function copyDir(src: string, dest: string) {
  try {
    if (!existsSync(src)) {
      console.warn(`Source directory ${src} does not exist, skipping copy.`);
      return;
    }
    
    const parentDir = dirname(dest);
    if (!existsSync(parentDir)) {
      await mkdir(parentDir, { recursive: true });
    }

    await cp(src, dest, { recursive: true });
    console.log(`Copied ${src} to ${dest}`);
  } catch (err) {
    console.error(`Error copying ${src} to ${dest}:`, err);
    process.exit(1);
  }
}

async function main() {
  const cwd = process.cwd();
  const nextDir = join(cwd, ".next");
  const standaloneDir = join(nextDir, "standalone");
  
  // Target directories
  const staticDest = join(standaloneDir, ".next", "static");
  const publicDest = join(standaloneDir, "public");

  console.log("Copying static assets for standalone build...");

  // Copy .next/static to .next/standalone/.next/static
  await copyDir(join(nextDir, "static"), staticDest);

  // Copy public to .next/standalone/public
  await copyDir(join(cwd, "public"), publicDest);
  
  console.log("Standalone build assets copied successfully.");
}

main();
