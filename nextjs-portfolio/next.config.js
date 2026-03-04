// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // LOCAL DEV
      { protocol: 'http', hostname: '127.0.0.1', port: '8001', pathname: '/media/**' },
      { protocol: 'http', hostname: 'localhost', port: '8001', pathname: '/media/**' },
      
      // PRODUCTION (PythonAnywhere)
      { protocol: 'https', hostname: 'justpythonindia.pythonanywhere.com', pathname: '/media/**' },
      
      // VERCEL PREVIEW & PRODUCTION
      { protocol: 'https', hostname: '**' }, // Allows ANY domain in production
    ],
  },
  // THIS MAKES YOUR <BaseUrl> COMPONENT WORK ON VERCEL
  basePath: '',
  assetPrefix: '',
  trailingSlash: false,
}

module.exports = nextConfig