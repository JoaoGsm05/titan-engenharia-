import { getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { getWhatsAppLink } from "@/lib/config";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export async function Services() {
  const t = await getTranslations("services");

  const groups = t.raw("groups") as Array<{
    id: string;
    title: string;
    description: string;
    items: string[];
  }>;

  return (
    <section id="services" className="py-32 bg-[#161b2b] relative">
      {/* Grid técnico de fundo */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <RevealOnScroll>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-headline text-xs tracking-[0.3em] text-[#B87333] uppercase block mb-4">
              {t("label")}
            </span>
            <h2 className="font-headline text-4xl font-bold tracking-tighter uppercase text-[#dee1f7]">
              {t("title")}
            </h2>
          </div>
          <p className="font-body text-[#B8C0C8] max-w-md text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
        </RevealOnScroll>

        {/* Grid de cards — borda estilo Kinetic Blueprint */}
        <RevealOnScroll delay={120}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {groups.map((group) => (
            <ServiceCard
              key={group.id}
              id={group.id}
              title={group.title}
              description={group.description}
              items={group.items}
              ctaLabel={t("cta")}
              whatsappLink={getWhatsAppLink(
                `Olá! Tenho interesse no serviço de ${group.title} da Titan Engenharia.`
              )}
            />
          ))}
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
