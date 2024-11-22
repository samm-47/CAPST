import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Route starting with /api
        destination: 'http://127.0.0.1:5000/api/:path*', // Proxy to Flask backend
      },
    ];
  },
};

export default nextConfig;
