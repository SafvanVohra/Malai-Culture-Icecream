import type { NextConfig } from "next";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const transparentLogoPath = path.join(process.cwd(), "public/images/melt/cream-crust-transparent.png");
// Regenerate transparent logo if needed
try {
  const scriptPath = path.join(process.cwd(), "scripts/make-transparent.mjs");
  execSync(`node "${scriptPath}"`, { stdio: "inherit" });
} catch (e) {
  console.warn("Could not generate transparent logo via script:", e);
}

const nextConfig: NextConfig = {
  // Hides the little "N" dev badge so it never shows up in a recording.
  devIndicators: false,
  images: { unoptimized: true },
  allowedDevOrigins: ["10.12.150.23", "localhost", "127.0.0.1"],
};

export default nextConfig;
