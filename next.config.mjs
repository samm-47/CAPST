/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined, // allows for working with npm run dev and npx next build
    images: {
      unoptimized: process.env.NODE_ENV === 'production', // Only apply in production
    },
  };
  
  export default nextConfig;
  