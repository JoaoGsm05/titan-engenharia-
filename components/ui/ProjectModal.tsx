"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project;
  closeLabel: string;
  onClose: () => void;
}

export function ProjectModal({ project, closeLabel, onClose }: ProjectModalProps) {
  // Fechar com Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem */}
        <div className="relative w-full h-64 sm:h-80">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
        </div>

        {/* Conteúdo */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#cc2020]">
                {project.type}
              </span>
              <h2 className="text-xl font-bold text-[#f0ede8] mt-1">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label={closeLabel}
              className="p-2 text-[#9a9a9a] hover:text-[#f0ede8] transition-colors flex-shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#9a9a9a]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {project.location}
          </div>

          <p className="text-sm text-[#9a9a9a] leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
