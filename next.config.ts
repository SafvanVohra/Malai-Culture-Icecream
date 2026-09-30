import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the little "N" dev badge so it never shows up in a recording.
  devIndicators: false,
  images: { unoptimized: true },
  allowedDevOrigins: ["10.12.150.23", "localhost", "127.0.0.1"],
};

export default nextConfig;
