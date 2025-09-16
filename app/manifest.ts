import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MBread Coffee & Tea',
    short_name: 'MBread',
    description: 'Thương hiệu cà phê và trà cao cấp tại Việt Nam',
    start_url: '/',
    display: 'standalone',
    background_color: '#8B4513',
    theme_color: '#D97706',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['food', 'lifestyle', 'business'],
    lang: 'vi',
    orientation: 'portrait',
  }
}
