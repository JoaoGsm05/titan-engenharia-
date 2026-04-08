import { getTranslations } from "next-intl/server";
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/config";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#090e1c] border-t border-[#B87333]/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-6">
            <div className="font-headline text-lg font-black text-[#B8C0C8] uppercase tracking-tighter">
              {SITE_CONFIG.company}
            </div>
            <p className="font-body text-xs tracking-widest uppercase text-[#B8C0C8]/60 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <div className="flex gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1.5" aria-hidden="true">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 mb-2">
              <h4 className="font-headline text-xs uppercase tracking-widest text-[#B87333]">
                Navegação
              </h4>
            </div>
            {(["about", "services", "portfolio", "contact"] as const).map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="font-body text-xs tracking-widest uppercase text-[#B8C0C8]/60 hover:text-[#B87333] transition-colors"
              >
                {t(`links.${key}`)}
              </a>
            ))}
          </div>

          {/* Contato */}
          <div className="flex flex-col items-start md:items-end justify-between gap-6">
            <div className="space-y-3 md:text-right">
              <h4 className="font-headline text-xs uppercase tracking-widest text-[#B87333]">
                Contato
              </h4>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-xs tracking-widest uppercase text-[#B8C0C8]/60 hover:text-[#B87333] transition-colors"
              >
                {SITE_CONFIG.whatsappDisplay}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="block font-body text-xs tracking-widest uppercase text-[#B8C0C8]/60 hover:text-[#B87333] transition-colors break-all"
              >
                {SITE_CONFIG.email}
              </a>
              <p className="font-body text-xs text-[#B8C0C8]/40">
                {SITE_CONFIG.coverage}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#46464c]/20 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-[10px] tracking-widest uppercase text-[#B8C0C8]/40">
            © {year} {SITE_CONFIG.company}. {t("rights")}
          </p>
          <p className="font-body text-[10px] tracking-widest uppercase text-[#B8C0C8]/30">
            Calibrado por Titan Eng. Systems
          </p>
        </div>
      </div>
    </footer>
  );
}
