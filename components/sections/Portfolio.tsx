"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { PORTFOLIO } from "@/lib/portfolio";
import { Project } from "@/types";

export function Portfolio() {
  const t = useTranslations("portfolio");
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-32 bg-[#0e1322] relative">
      {/* Grid técnico */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
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

        {/* Grid de projetos — borda industrial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {PORTFOLIO.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className="group relative overflow-hidden aspect-[4/3] text-left w-full metallic-card border border-[#46464c]/10"
              aria-label={`Ver detalhes: ${project.title}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale-[0.2]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1322] via-[#0e1322]/40 to-transparent" />

              {/* Conteúdo */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
                <span className="font-headline text-xs font-bold uppercase tracking-[0.2em] text-[#B87333]">
                  {project.type}
                </span>
                <h3 className="font-headline text-base font-bold text-[#dee1f7] leading-snug">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#B8C0C8]/60">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {project.location}
                </div>
              </div>

              {/* Badge "Ver detalhes" no hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-headline text-xs font-semibold text-white bg-[#B87333] px-3 py-1.5 uppercase tracking-widest">
                  {t("view_details")}
                </span>
              </div>

              {/* Linha copper no hover */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B87333] group-hover:w-full transition-all duration-500" />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          closeLabel={t("close")}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
