export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/admin", "/security", "/api"],
      },
    ],
    sitemap: "https://cloudbook.ravexcode.com/sitemap.xml",
  };
}