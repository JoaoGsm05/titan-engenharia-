import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";

export async function About() {
  const t = await getTranslations("about");

  const stats = [
    { value: SITE_CONFIG.engineer.experience_years, label: t("stat_years"), copper: true },
    { value: "7+",  label: t("stat_countries"), copper: false },
    { value: "20+", label: t("stat_projects"),  copper: true },
    { value: "12",  label: "Países Africanos",   copper: false },
  ];

  return (
    <section id="about" className="py-32 bg-[#0e1322] relative overflow-hidden">
      {/* Grid técnico */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header da seção */}
        <header className="relative mb-20 flex items-end justify-between border-l-2 border-[#B87333] pl-8 py-4">
          {/* Ember particles decorativos */}
          <div className="ember-field opacity-20">
            <div className="ember ember-copper" style={{ "--duration": "8s", "--delay": "0s", "--start-x": "10%", "--end-x": "15%", "--max-opacity": "0.4", width: "4px", height: "4px", left: "20%" } as React.CSSProperties} />
            <div className="ember ember-tin"    style={{ "--duration": "10s", "--delay": "2s", "--start-x": "40%", "--end-x": "35%", "--max-opacity": "0.3", width: "3px", height: "3px", left: "50%" } as React.CSSProperties} />
            <div className="ember ember-copper" style={{ "--duration": "12s", "--delay": "4s", "--start-x": "80%", "--end-x": "85%", "--max-opacity": "0.2", width: "5px", height: "5px", left: "70%" } as React.CSSProperties} />
          </div>

          <div className="max-w-2xl">
            <span className="font-headline text-xs tracking-[0.3em] uppercase text-[#B87333] mb-4 block">
              {t("label")}
            </span>
            <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-[#dee1f7] leading-none">
              {t("title")}
            </h2>
          </div>

          <div className="hidden lg:block text-right">
            <p className="font-label text-[10px] text-[#909097] uppercase tracking-[0.2em]">
              Fundada: 2021
            </p>
            <p className="font-label text-[10px] text-[#909097] uppercase tracking-[0.2em]">
              Ribeirão Preto, BR
            </p>
          </div>
        </header>

        {/* Grid principal: foto + bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-[#46464c]/15">

          {/* Coluna da foto */}
          <div className="lg:col-span-5 relative group">
            {/* Linha vertical copper */}
            <div className="absolute top-0 -left-px h-full w-0.5 bg-gradient-to-b from-[#B87333] to-transparent z-10" />

            <div className="relative overflow-hidden aspect-[4/5] bg-[#161b2b]">
              <Image
                src="/assets/fotos/Foto Profissional.webp"
                alt={`${SITE_CONFIG.engineer.name} — ${SITE_CONFIG.engineer.title}`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 448px"
              />
              {/* Gradiente na base */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1322] via-transparent to-transparent opacity-60" />

              {/* Overlay de metadados */}
              <div className="absolute bottom-0 left-0 w-full p-8 bg-[#25293a]/40 backdrop-blur-sm border-t border-[#B87333]/20">
                <h3 className="font-headline text-xl font-bold tracking-tight text-[#dee1f7]">
                  {SITE_CONFIG.engineer.name}
                </h3>
                <p className="font-headline text-xs uppercase tracking-widest text-[#B87333] mt-1">
                  {SITE_CONFIG.engineer.title}
                </p>
              </div>
            </div>

            {/* Ember particles na coluna bio */}
            <div className="ember-field opacity-25">
              <div className="ember ember-copper" style={{ "--duration": "15s", "--delay": "1s", "--start-x": "5%",  "--end-x": "10%", "--max-opacity": "0.5", width: "4px", height: "4px", left: "15%" } as React.CSSProperties} />
              <div className="ember ember-tin"    style={{ "--duration": "18s", "--delay": "3s", "--start-x": "90%", "--end-x": "85%", "--max-opacity": "0.4", width: "3px", height: "3px", left: "80%" } as React.CSSProperties} />
            </div>
          </div>

          {/* Coluna da bio */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 lg:p-16 bg-[#161b2b] relative overflow-hidden">
            {/* Ember particles */}
            <div className="ember-field opacity-20">
              <div className="ember ember-copper" style={{ "--duration": "12s", "--delay": "0s", "--start-x": "50%", "--end-x": "55%", "--max-opacity": "0.3", width: "6px", height: "6px", left: "40%" } as React.CSSProperties} />
              <div className="ember ember-tin"    style={{ "--duration": "20s", "--delay": "7s", "--start-x": "20%", "--end-x": "25%", "--max-opacity": "0.3", width: "2px", height: "2px", left: "10%" } as React.CSSProperties} />
            </div>

            {/* Ícone decorativo */}
            <div className="absolute top-4 right-4 opacity-10">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="0.5" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            </div>

            <div className="space-y-10 relative z-10">
              {/* Missão */}
              <section>
                <span className="font-headline text-[10px] uppercase tracking-widest text-[#B8C0C8]/50 mb-4 block">
                  01 / {t("mission_label")}
                </span>
                <p className="font-headline text-xl md:text-2xl font-medium text-[#dee1f7] leading-tight">
                  {t("mission")}
                </p>
              </section>

              {/* Narrativa */}
              <section>
                <span className="font-headline text-[10px] uppercase tracking-widest text-[#B8C0C8]/50 mb-4 block">
                  02 / Narrativa
                </span>
                <div className="flex flex-col gap-3">
                  <p className="font-body text-sm text-[#B8C0C8] leading-relaxed">{t("p1")}</p>
                  <p className="font-body text-sm text-[#B8C0C8] leading-relaxed">{t("p2")}</p>
                </div>
              </section>

              {/* Formação */}
              <section>
                <span className="font-headline text-[10px] uppercase tracking-widest text-[#B8C0C8]/50 mb-2 block">
                  03 / Formação
                </span>
                <p className="font-body text-xs text-[#B8C0C8]/70">{t("formation")}</p>
              </section>
            </div>
          </div>
        </div>

        {/* Stats — 4 colunas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-[#46464c]/15 relative z-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-12 flex flex-col items-center justify-center border-r border-[#46464c]/15 relative overflow-hidden group ${
                i % 2 === 0 ? "bg-[#0e1322]" : "bg-[#090e1c]"
              }`}
            >
              <span className={`font-headline text-5xl font-black mb-2 tracking-tighter transition-colors duration-300 ${
                stat.copper
                  ? "text-[#dee1f7] group-hover:text-[#B87333]"
                  : "text-[#dee1f7] group-hover:text-[#B8C0C8]"
              }`}>
                {stat.value}
              </span>
              <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-[#B8C0C8]/60 text-center">
                {stat.label}
              </span>
              {/* Barra de hover */}
              <div className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                stat.copper ? "bg-[#B87333]" : "bg-[#B8C0C8]"
              }`} />
            </div>
          ))}
        </div>

        {/* Autoridade técnica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24 relative z-10">
          <div className="p-8 border border-[#B87333]/10 bg-[#161b2b] relative overflow-hidden group">
            <h3 className="font-headline text-lg text-[#B87333] uppercase tracking-tighter mb-6 relative z-10">
              Autoridade Metalúrgica
            </h3>
            <ul className="space-y-4 font-body text-sm text-[#B8C0C8] relative z-10">
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 flex-shrink-0" style={{ background: "#B87333" }} />
                <span>{t("p3")}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 flex-shrink-0 bg-[#B8C0C8]" />
                <span>Especialização em ligas de estanho, cobre e metais pesados</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 flex-shrink-0" style={{ background: "#B87333" }} />
                <span>Do estudo de viabilidade (CAPEX/OPEX) à operação plena da planta</span>
              </li>
            </ul>
          </div>

          <div className="relative group cursor-crosshair">
            <div className="h-full bg-[#2f3445]/20 overflow-hidden relative border border-[#46464c]/10">
              <Image
                src="/assets/fotos/Foto no trabalho.webp"
                alt="Marlon de Mendonça em campo"
                fill
                className="object-cover opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1" aria-hidden="true" className="mx-auto mb-2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                  <p className="font-headline text-[10px] uppercase tracking-widest text-[#B87333]">
                    Calibração em Campo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
