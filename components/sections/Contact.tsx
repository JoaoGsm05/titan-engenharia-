"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/config";
import { ContactFormData, ContactFormState } from "@/types";

export function Contact() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [state, setState] = useState<ContactFormState>({ status: "idle" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (state.status === "error") setState({ status: "idle" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ status: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setState({ status: "success" });
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setState({ status: "error" });
      }
    } catch {
      setState({ status: "error" });
    }
  }

  return (
    <section id="contact" className="relative pt-8 min-h-screen bg-[#090e1c] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#B87333]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#B8C0C8]/3 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <header className="mb-16 border-l-2 border-[#B87333] pl-8 py-4">
          <span className="font-headline text-xs tracking-[0.3em] uppercase text-[#B87333] mb-4 block">
            {t("label")} — Fase: Conexão
          </span>
          <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-[#dee1f7] leading-none uppercase">
            <span className="shimmer-text">
              {t("title").split(".")[0]}.
            </span>
          </h2>
        </header>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#46464c]/10 border border-[#46464c]/15">

          {/* Coluna esquerda — informações */}
          <div className="lg:col-span-5 bg-[#0e1322] p-10 md:p-16 border-r border-[#46464c]/15">
            <div className="space-y-12">

              {/* WhatsApp */}
              <div>
                <h3 className="text-xs font-headline tracking-widest uppercase text-[#B8C0C8]/50 mb-6">
                  {t("whatsapp_label")}
                </h3>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#B87333" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div>
                    <p className="text-lg font-headline font-medium text-[#dee1f7] group-hover:text-[#B87333] transition-colors">
                      {SITE_CONFIG.whatsappDisplay}
                    </p>
                    <p className="text-[#B8C0C8]/50 text-sm">WhatsApp direto</p>
                  </div>
                </a>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-xs font-headline tracking-widest uppercase text-[#B8C0C8]/50 mb-6">
                  {t("email_label")}
                </h3>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-4 group"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1.5" aria-hidden="true">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[#B8C0C8] group-hover:text-[#B87333] transition-colors break-all text-sm">
                    {SITE_CONFIG.email}
                  </span>
                </a>
              </div>

              {/* Cobertura */}
              <div>
                <h3 className="text-xs font-headline tracking-widest uppercase text-[#B8C0C8]/50 mb-6">
                  {t("location_label")}
                </h3>
                <div className="grid grid-cols-2 gap-y-4">
                  {["Brasil", "África", "América do Sul", "Global"].map((loc) => (
                    <div key={loc} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#B87333] flex-shrink-0" />
                      <span className="text-xs font-headline tracking-widest uppercase text-[#B8C0C8]/70">{loc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linha decorativa */}
              <div className="pt-4 border-t border-[#46464c]/20">
                <p className="font-headline text-[10px] uppercase tracking-[0.3em] text-[#B8C0C8]/30">
                  Tempo de resposta &lt; 24h
                </p>
              </div>
            </div>
          </div>

          {/* Coluna direita — formulário */}
          <div className="lg:col-span-7 bg-[#161b2b] p-10 md:p-16">
            <div className="max-w-xl">
              <h3 className="text-xs font-headline tracking-widest uppercase text-[#B8C0C8]/50 mb-10">
                Transmissão de Projeto
              </h3>

              <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                {/* Nome */}
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-headline tracking-widest uppercase text-[#B8C0C8]/40 mb-2 group-focus-within:text-[#B87333] transition-colors"
                  >
                    {t("form.name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ENGENHEIRO / EMPRESA"
                    className="w-full bg-transparent border-0 border-b border-[#46464c]/40 py-3 text-[#dee1f7] focus:outline-none focus:border-[#B87333] transition-all placeholder:text-[#B8C0C8]/40 font-headline tracking-tight text-sm"
                  />
                </div>

                {/* Telefone */}
                <div className="group">
                  <label
                    htmlFor="phone"
                    className="block text-[10px] font-headline tracking-widest uppercase text-[#B8C0C8]/40 mb-2 group-focus-within:text-[#B87333] transition-colors"
                  >
                    {t("form.phone")}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+55 16 99302-0303"
                    className="w-full bg-transparent border-0 border-b border-[#46464c]/40 py-3 text-[#dee1f7] focus:outline-none focus:border-[#B87333] transition-all placeholder:text-[#B8C0C8]/40 font-headline tracking-tight text-sm"
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-headline tracking-widest uppercase text-[#B8C0C8]/40 mb-2 group-focus-within:text-[#B87333] transition-colors"
                  >
                    {t("form.email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="VOCE@EMPRESA.COM"
                    className="w-full bg-transparent border-0 border-b border-[#46464c]/40 py-3 text-[#dee1f7] focus:outline-none focus:border-[#B87333] transition-all placeholder:text-[#B8C0C8]/40 font-headline tracking-tight text-sm"
                  />
                </div>

                {/* Mensagem */}
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-headline tracking-widest uppercase text-[#B8C0C8]/40 mb-2 group-focus-within:text-[#B87333] transition-colors"
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="DESCREVA O ESCOPO E OS REQUISITOS DO PROJETO..."
                    className="w-full bg-transparent border-0 border-b border-[#46464c]/40 py-3 text-[#dee1f7] focus:outline-none focus:border-[#B87333] transition-all placeholder:text-[#B8C0C8]/40 font-headline tracking-tight text-sm resize-none"
                  />
                </div>

                {/* Feedback */}
                {state.status === "success" && (
                  <div className="border-l-2 border-[#B87333] bg-[#B87333]/10 px-4 py-3 text-sm text-[#dee1f7] font-body">
                    {t("form.success")}
                  </div>
                )}
                {state.status === "error" && (
                  <div className="border-l-2 border-red-500 bg-red-900/20 px-4 py-3 text-sm text-red-400 font-body">
                    {t("form.error")}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state.status === "sending"}
                  className="molten-pulse w-full md:w-auto px-12 py-5 bg-[#B87333] text-white font-headline font-bold uppercase tracking-tighter hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {state.status === "sending" ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      {t("form.submit")}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Banner watermark */}
        <div className="mt-32 opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <div className="text-[8rem] md:text-[12rem] font-headline font-black uppercase tracking-tighter leading-none whitespace-nowrap -ml-4 text-[#dee1f7]">
            TITAN ENGENHARIA METALURGIA
          </div>
        </div>
      </div>
    </section>
  );
}
