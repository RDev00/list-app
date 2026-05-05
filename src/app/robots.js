export default function robots() {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/", "/about-md", "/download", "/try", "/tyc", "/bug-reports"],
        disallow: ["/admin", "/security", "/api"],
        crawlDelay: 1,
      },
      {
        userAgent: "*",
        allow: ["/", "/about-md", "/download", "/try", "/tyc", "/bug-reports"],
        disallow: ["/admin", "/security", "/api"],
      },
    ],
    sitemap: "https://cloudbook.ravexcode.com/sitemap.xml",
    host: "https://cloudbook.ravexcode.com",
  };
}