import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import bundleAnalyzer from '@next/bundle-analyzer'
import path from 'path'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  compress: true,

  // --- Experimental Settings ---
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'next-intl',
      'use-intl',
      '@next/third-parties',
      'clsx',
    ],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // --- Compiler & Output Options ---
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // --- Sass / Styling Configuration ---
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/scss')],
    additionalData: `
      @use "@/scss/config" as *;
    `,
  },

  // --- Image Optimization ---
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 576, 768, 992, 1280],
    minimumCacheTTL: 60 * 60 * 24,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors \'self\' https://web.telegram.org https://*.web.telegram.org',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

const configWithIntl = withNextIntl(nextConfig)

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer(configWithIntl)
  : configWithIntl
