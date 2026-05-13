/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/myCV',
  assetPrefix: '/myCV',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
