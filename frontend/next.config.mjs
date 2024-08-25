/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    API_URL: "localhost:8055",
  },
};

export default nextConfig;
