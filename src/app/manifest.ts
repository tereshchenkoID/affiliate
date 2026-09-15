export default function manifest() {
  return {
    name: 'Affiliate',
    short_name: 'Affiliate',
    description: 'Affiliate',
    start_url: '/',
    display: 'standalone',
    background_color: '#031b1f',
    theme_color: '#0490a8',
    icons: [
      {
        src: '/icons/logo192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/logo512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
