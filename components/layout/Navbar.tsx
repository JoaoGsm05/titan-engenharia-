"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/config";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#about",     label: t("about") },
    { href: "#services",  label: t("services") },
    { href: "#portfolio", label: t("portfolio") },
    { href: "#contact",   label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0e1322]/95 backdrop-blur-md border-b border-[#B87333]/10"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" aria-label={`${SITE_CONFIG.company} — início`}>
          <Image
            src="/assets/logo.png"
            alt={`Logo ${SITE_CONFIG.company}`}
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-headline text-xs font-semibold uppercase tracking-widest text-[#c1c7cf]/70 hover:text-[#B87333] transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href={getWhatsAppLink("Olá! Vim pelo site da Titan Engenharia e gostaria de um orçamento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            {t("cta")}
          </a>
        </div>

        {/* Mobile: language + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="p-2 text-[#c1c7cf]"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6"  x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#161b2b] border-t border-[#46464c]/20 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-headline text-sm font-semibold uppercase tracking-widest text-[#c1c7cf] py-2 border-b border-[#46464c]/20 hover:text-[#B87333] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={getWhatsAppLink("Olá! Vim pelo site da Titan Engenharia e gostaria de um orçamento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs mt-2 justify-center"
          >
            {t("cta")}
          </a>
        </div>
      )}
    </header>
  );
}
