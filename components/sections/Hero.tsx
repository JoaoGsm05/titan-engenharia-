import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/config";
import { MetallurgicalBackground } from "@/components/ui/MetallurgicalBackground";

export async function Hero() {
  const t = await getTranslations("hero");

  const stats = [
    { number: "3",   label: "Continentes" },
    { number: "28",  label: t("experience") },
    { number: "20+", label: t("sectors") },
    { number: "7+",  label: "Países Atendidos" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-[#0e1322]"
    >
      {/* Grid técnico de fundo */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0" />

      {/* Fluxo molten animado */}
      <div className="molten-flow" />
      <div className="liquid-metal-bg" />

      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1322] via-[#0e1322]/80 to-[#0e1322]/50 z-10" />
        <Image
          src="/assets/fotos/forno-operando.jpeg"
          alt="Forno industrial Titan Engenharia em operação"
          fill
          className="object-cover opacity-30 grayscale-[0.3] contrast-[1.1]"
          priority
          sizes="100vw"
        />
      </div>

      {/* Canvas — efeito metalúrgico animado (cobre/estanho fundidos + faíscas) */}
      <MetallurgicalBackground />

      {/* Linha decorativa vertical copper */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#B87333] to-transparent opacity-60 z-20" />

      {/* Conteúdo principal */}
      <div className="relative z-20 max-w-5xl mx-auto w-full pt-28 pb-20 space-y-8">

        {/* Badge tagline */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#25293a] border-l-4 border-[#B87333]">
          <span className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-[#B87333]">
            {t("tagline")}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none max-w-4xl text-[#dee1f7]">
          {t("headline").split("—")[0]}
          {t("headline").includes("—") && (
            <>
              — <span className="shimmer-text">{t("headline").split("—")[1]?.trim()}</span>
            </>
          )}
        </h1>

        {/* Sub-headline */}
        <p className="font-body text-base md:text-lg text-[#B8C0C8] max-w-2xl leading-relaxed">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href={getWhatsAppLink(
              "Olá! Vim pelo site da Titan Engenharia e gostaria de solicitar um orçamento."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary molten-pulse flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("cta_primary")}
          </a>
          <a href="#services" className="btn-outline">
            {t("cta_secondary")}
          </a>
        </div>

        {/* Stats — 4 colunas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#46464c]/20">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-headline text-3xl font-bold text-[#B87333]">
                {stat.number}
              </div>
              <div className="text-xs font-label uppercase tracking-widest text-[#B8C0C8]/60 mt-1 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="w-px h-10 bg-gradient-to-b from-[#46464c]/30 to-[#B87333]" />
        <a
          href="#about"
          aria-label="Ir para Sobre"
          className="text-[#B8C0C8]/50 hover:text-[#B87333] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
