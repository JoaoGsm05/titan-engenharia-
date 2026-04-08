import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";
import { sendContactEmail } from "@/lib/services/email";
import { ContactFormData } from "@/types";

export async function POST(req: NextRequest) {
  // 1. Controle de Rate Limit
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em 1 hora." },
      { status: 429 }
    );
  }

  // 2. Extração e Validação de Dados
  let body: Partial<ContactFormData>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Nome, email e mensagem são obrigatórios." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  // 3. Chamada ao Serviço de E-mail
  const result = await sendContactEmail({
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() || "",
    message: message.trim(),
  });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Erro ao enviar email." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
