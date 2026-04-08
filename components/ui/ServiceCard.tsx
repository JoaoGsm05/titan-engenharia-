import React from "react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  items: string[];
  ctaLabel: string;
  whatsappLink: string;
}

export function ServiceCard({
  id,
  title,
  description,
  items,
  ctaLabel,
  whatsappLink,
}: ServiceCardProps) {
  return (
    <div className="border border-[#46464c]/10 p-10 hover:bg-[#25293a] transition-all duration-300 group metallic-card flex flex-col gap-6 bg-[#0e1322]">
      {/* Ícone */}
      <div className="w-12 h-12 flex items-center justify-center">
        <ServiceIcon id={id} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-headline text-lg font-bold uppercase tracking-tight text-[#dee1f7]">
          {title}
        </h3>
        <p className="text-sm text-[#B8C0C8]/70 font-body leading-relaxed">
          {description}
        </p>
      </div>

      <ul className="flex flex-col gap-2 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#B8C0C8]/70">
            <span className="mt-1.5 w-1.5 h-1.5 flex-shrink-0 bg-[#B87333]" />
            {item}
          </li>
        ))}
      </ul>

      {/* Linha de hover copper */}
      <div className="h-px w-0 bg-[#B87333] group-hover:w-full transition-all duration-500" />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto font-headline text-xs font-bold uppercase tracking-widest text-[#B87333] hover:text-[#dee1f7] transition-colors flex items-center gap-2"
      >
        {ctaLabel}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

function ServiceIcon({ id }: { id: string }) {
  const iconProps = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#B87333",
    strokeWidth: 1.5,
    "aria-hidden": true,
  };

  const icons: Record<string, React.ReactElement> = {
    consultoria: (
      <svg {...iconProps}>
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    projetos: (
      <svg {...iconProps}>
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    produtos: (
      <svg {...iconProps}>
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    treinamentos: (
      <svg {...iconProps}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  };

  return icons[id] ?? (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
