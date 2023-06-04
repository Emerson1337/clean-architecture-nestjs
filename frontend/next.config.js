module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/coffee",
        permanent: true,
      },
    ];
  },
};
