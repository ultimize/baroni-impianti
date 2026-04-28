import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/chi-siamo', destination: '/specialista-elettrico-sestri-levante', permanent: true },
      { source: '/servizi', destination: '/elettricista-a-chiavari-e-sestri-levante', permanent: true },
      { source: '/servizi/impianti-cablati', destination: '/progettazione-impianti-rete-cablata-a-sestri-levante', permanent: true },
      { source: '/servizi/impianti-sicurezza', destination: '/progettazione-e-realizzazione-impianti-di-sicurezza-sestri-levante', permanent: true },
      { source: '/servizi/protezione-spd', destination: '/protezione-dalle-scariche-atmosferiche-installazione-spd', permanent: true },
      { source: '/blog', destination: '/blog-per-elettricisti', permanent: true },
      { source: '/2024/01/30/realizzazione-di-impianti-digitali-integrati', destination: '/realizzazione-di-impianti-digitali-integrati', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "igtwzuxufrdflhmwuzpq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
}

export default nextConfig
