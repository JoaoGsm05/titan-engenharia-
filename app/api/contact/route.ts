import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";
import { sendContactEmail } from "@/lib/services/email";
import { ContactFormData } from "@/types";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 5000;

const ALLOWED_ORIGINS = new Set([
  "https://www.engenhariatitan.com",
  "https://engenhariatitan.com",
]);

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://www.engenhariatitan.com";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: NextRequest) {
  // 1. Content-Type check
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type deve ser application/json." },
      { status: 415, headers: corsHeaders(req) }
    );
  }

  // 2. Rate limiting
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em 1 hora." },
      { status: 429, headers: corsHeaders(req) }
    );
  }

  // 3. Parse do body
  let body: Partial<ContactFormData>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Requisição inválida." },
      { status: 400, headers: corsHeaders(req) }
    );
  }

  const { name, email, phone, message } = body;

  // 4. Campos obrigatórios
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Nome, email e mensagem são obrigatórios." },
      { status: 400, headers: corsHeaders(req) }
    );
  }

  // 5. Limites de tamanho
  if (name.trim().length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "Nome muito longo." }, { status: 400, headers: corsHeaders(req) });
  }
  if (email.trim().length > MAX_EMAIL_LENGTH) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400, headers: corsHeaders(req) });
  }
  if (phone && phone.trim().length > MAX_PHONE_LENGTH) {
    return NextResponse.json(
      { error: "Telefone inválido." },
      { status: 400, headers: corsHeaders(req) }
    );
  }
  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Mensagem muito longa (máx. 5000 caracteres)." },
      { status: 400, headers: corsHeaders(req) }
    );
  }

  // 6. Validação de email (exige exatamente um @, domínio com ponto)
  const emailParts = email.trim().split("@");
  if (
    emailParts.length !== 2 ||
    emailParts[0].length === 0 ||
    !emailParts[1].includes(".") ||
    emailParts[1].startsWith(".") ||
    emailParts[1].endsWith(".")
  ) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400, headers: corsHeaders(req) });
  }

  // 7. Envio do email
  const result = await sendContactEmail({
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() || "",
    message: message.trim(),
  });

  if (!result.success) {
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente mais tarde." },
      { status: 500, headers: corsHeaders(req) }
    );
  }

  return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders(req) });
}
