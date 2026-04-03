import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

/** Pin Turbopack to this app so it does not treat a parent folder (e.g. `C:\\Users\\bengr`) as the workspace when another `package-lock.json` exists there. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Dev: allow LAN IP for /_next/webpack-hmr when opening the site from another device on your network */
  allowedDevOrigins: ["192.168.0.157"],
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
