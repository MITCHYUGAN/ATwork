/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cssModules: true,
  swcMinify: true,
  images: {
    domains: ['ipfs-gw.stargaze-apis.com'],
  }
}

module.exports = nextConfig
