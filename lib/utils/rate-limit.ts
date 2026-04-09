import { NextRequest } from "next/server";

// Rate limiting por IP (em memória — funciona para instâncias únicas; em serverless
// distribído, use Upstash Redis para garantia total entre instâncias Vercel)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // máx 3 envios por IP
const RATE_WINDOW_MS = 60 * 60 * 1000; // janela de 1 hora

/** Remove entradas expiradas para evitar memory leak em instâncias longas. */
function purgeExpired() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Limpa expirados a cada 50 chamadas (probabilístico, sem overhead constante)
  if (rateLimitMap.size % 50 === 0 && rateLimitMap.size > 0) purgeExpired();

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count += 1;
  return true;
}

/**
 * Extrai o IP real do cliente.
 * Prioriza x-vercel-forwarded-for (IP real no Vercel) e x-real-ip.
 * O x-forwarded-for é o último recurso pois pode ser forjado por proxies intermediários.
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
