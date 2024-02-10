/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "basic-goshawk-637.convex.cloud",
        protocol: "https",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
      {
        hostname: "loremflickr.com",
        protocol: "https",
      },
      {
        hostname: "cloudflare-ipfs.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
