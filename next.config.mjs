import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'api.ts', 'api.tsx'],
  i18n: {
    locales: ['en', 'zh', 'ja'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default withNextIntl(nextConfig);