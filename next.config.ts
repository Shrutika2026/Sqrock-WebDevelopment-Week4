import type { NextConfig } from "next";
import path from "path";
import os from "os";

// OneDrive locks files under the project folder; keep dev caches in %TEMP%.
const devCacheDir = path.join(os.tmpdir(), "codelearn-lms-next-cache");

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = {
        ...config.cache,
        type: "filesystem",
        cacheDirectory: devCacheDir,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
