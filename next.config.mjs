export default {
  async rewrites() {
    return [
      {
        source: '/api/chat',
        destination: 'https://capst.onrender.com/api/chat', // Proxy to the Flask backend
      },
    ];
  },
};
