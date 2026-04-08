"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    if (next === locale) return;
    // Troca o prefixo de locale na URL
    const segments = pathname.split("/");
    segments[1] = next;
    const newPath = segments.join("/") || "/";
    startTransition(() => {
      router.push(newPath);
    });
  }

  return (
    <div className="flex items-center gap-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-full p-1">
      <button
        onClick={() => switchLocale("pt")}
        title="Português"
        disabled={isPending}
        className={`w-8 h-8 rounded-full text-base transition-all flex items-center justify-center ${
          locale === "pt"
            ? "bg-[#cc2020] shadow-sm"
            : "opacity-50 hover:opacity-80"
        }`}
        aria-label="Mudar para Português"
        aria-pressed={locale === "pt"}
      >
        🇧🇷
      </button>
      <button
        onClick={() => switchLocale("en")}
        title="English"
        disabled={isPending}
        className={`w-8 h-8 rounded-full text-base transition-all flex items-center justify-center ${
          locale === "en"
            ? "bg-[#cc2020] shadow-sm"
            : "opacity-50 hover:opacity-80"
        }`}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        🇺🇸
      </button>
    </div>
  );
}
