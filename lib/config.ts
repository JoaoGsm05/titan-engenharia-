export const SITE_CONFIG = {
  company: "Titan Engenharia",
  domain: "engenhariatitan.com",
  whatsapp: "5516993020303",
  whatsappDisplay: "+55 (16) 99302-0303",
  email: "marlon@engenhariatitan.com.br", // trocar para @engenhariatitan.com quando ativo
  phone: "+55 (16) 99302-0303",
  location: "Ribeirão Preto, SP — Brasil",
  coverage: "Global — Brasil, África, América do Sul",
  founding_year: 2021,
  engineer: {
    name: "Marlon de Mendonça",
    title: "Engenheiro Civil | Especialista em Metalurgia de Metais Não Ferrosos",
    formation: "PUC — Engenharia Civil, 1998",
    specialization: "Metalurgia de Metais Não Ferrosos",
    experience_years: 28,
  },
  social: {
    instagram: "", // preencher quando disponível
    linkedin: "", // preencher quando disponível
  },
  ga4: "G-XXXXXXXXXX", // substituir pelo Measurement ID real do GA4
  seo: {
    pt: {
      title: "Titan Engenharia — Metalurgia de Metais Não Ferrosos | Global",
      description:
        "Consultoria em metalurgia, projetos industriais e treinamentos especializados em metais não ferrosos. Projetos em África, América do Sul e Brasil.",
    },
    en: {
      title: "Titan Engenharia — Non-Ferrous Metals Metallurgy | Global",
      description:
        "Metallurgical consulting, industrial projects, and specialized training in non-ferrous metals. Projects in Africa, South America, and Brazil.",
    },
  },
} as const;

export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${SITE_CONFIG.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
