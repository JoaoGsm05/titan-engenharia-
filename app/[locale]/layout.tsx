import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { routing } from "@/lib/routing";
import { SITE_CONFIG } from "@/lib/config";
import "@/app/globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = SITE_CONFIG.seo[locale as "pt" | "en"] ?? SITE_CONFIG.seo.pt;

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      "engenharia metalúrgica",
      "metais não ferrosos",
      "consultoria industrial",
      "estanho",
      "mineração",
      "África",
      "metallurgical engineering",
      "non-ferrous metals",
    ],
    authors: [{ name: SITE_CONFIG.engineer.name }],
    creator: SITE_CONFIG.company,
    metadataBase: new URL(`https://${SITE_CONFIG.domain}`),
    alternates: {
      canonical: locale === "pt" ? "/" : `/${locale}`,
      languages: {
        "pt-BR": "/",
        "en-US": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      url: `https://${SITE_CONFIG.domain}`,
      siteName: SITE_CONFIG.company,
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  // JSON-LD: LocalBusiness + ProfessionalService
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: SITE_CONFIG.company,
    description:
      "Consultoria em metalurgia de metais não ferrosos, projetos industriais e treinamentos técnicos. Projetos em África, América do Sul e Brasil.",
    url: `https://${SITE_CONFIG.domain}`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ribeirão Preto",
      addressRegion: "SP",
      addressCountry: "BR",
      postalCode: "14027-005",
    },
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.engineer.name,
      jobTitle: SITE_CONFIG.engineer.title,
    },
    foundingDate: SITE_CONFIG.founding_year,
    areaServed: ["BR", "UG", "CD", "NG", "NA", "VE", "BO"],
    serviceType: [
      "Consultoria Metalúrgica",
      "Projetos Industriais",
      "Desenvolvimento de Produtos",
      "Treinamentos Especializados",
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={SITE_CONFIG.ga4} />
      </body>
    </html>
  );
}
