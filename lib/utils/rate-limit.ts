import { NextRequest } from "next/server";

// Rate limiting simples por IP (em memória — suficiente para um site institucional)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // máx 3 envios por IP
const RATE_WINDOW_MS = 60 * 60 * 1000; // janela de 1 hora

/**
 * Verifica se um IP ultrapassou o limite de requisições.
 * @param ip O endereço IP do cliente.
 * @returns boolean True se permitido, False se bloqueado.
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
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
 * Extrai o IP do cliente de uma NextRequest.
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}
