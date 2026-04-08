import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const securityHeaders = [
  // Impede MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Bloqueia iframes externos (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Filtro XSS legacy (browsers antigos)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Não vaza URL completa ao navegar para outros sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desativa features desnecessárias
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Força HTTPS por 2 anos (ativar apenas após HTTPS confirmado em produção)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js App Router requer unsafe-inline para scripts de hidratação
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
      "media-src 'none'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
