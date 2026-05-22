/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@org/contracts', '@org/ui'],
};

export default nextConfig;
