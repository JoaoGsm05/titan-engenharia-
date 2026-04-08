import { Resend } from "resend";
import { ContactFormData } from "@/types";

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, message } = data;

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!apiKey) throw new Error("RESEND_API_KEY environment variable is not set");
  if (!contactEmail) throw new Error("CONTACT_EMAIL environment variable is not set");

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "Site Titan Engenharia <noreply@engenhariatitan.com>",
      to: [contactEmail],
      replyTo: email,
      subject: `Novo contato via site — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #f0ede8; border-radius: 8px; overflow: hidden;">
          <div style="background: #cc2020; padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; color: white;">Novo contato — Titan Engenharia</h1>
          </div>
          <div style="padding: 32px; display: flex; flex-direction: column; gap: 16px;">
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="padding: 8px 0; color: #9a9a9a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Nome</td>
                <td style="padding: 8px 0; color: #f0ede8;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9a9a9a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">E-mail</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #cc2020;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #9a9a9a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Telefone</td>
                <td style="padding: 8px 0; color: #f0ede8;">${phone}</td>
              </tr>` : ""}
              <tr>
                <td colspan="2" style="padding: 16px 0 8px; color: #9a9a9a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid #2e2e2e;">Mensagem</td>
              </tr>
              <tr>
                <td colspan="2" style="color: #f0ede8; line-height: 1.6; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #0d0d0d; color: #9a9a9a; font-size: 12px;">
            Enviado via engenhariatitan.com
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend internal error:", result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Send email error:", err);
    return { success: false, error: "Erro ao enviar email." };
  }
}
