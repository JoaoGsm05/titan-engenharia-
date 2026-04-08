/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://engenhariatitan.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  alternateRefs: [
    { href: "https://engenhariatitan.com", hreflang: "pt-BR" },
    { href: "https://engenhariatitan.com/en", hreflang: "en-US" },
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
