export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://capst.onrender.com/api/:path*', // Proxy to the Flask backend
      },
    ];
  },
};
