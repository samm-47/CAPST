/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'production', // Only apply in production
  },
};

export default nextConfig;
