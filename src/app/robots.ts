export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*/account',
          '/*/account/*',
        ],
      },
    ],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  }
}
