export const metadata = {
  title: "Guía del Formato Markdown | CloudBook",
  description: "Aprende a escribir notas estructuradas usando Markdown. Desde lo básico hasta técnicas avanzadas para documentación profesional.",
  keywords: ["markdown", "guía markdown", "sintaxis markdown", "tutorial markdown", "markdown editor"],
  openGraph: {
    title: "Guía del Formato Markdown | CloudBook",
    description: "Aprende a escribir notas estructuradas usando Markdown en CloudBook.",
    url: "https://cloudbook.ravexcode.com/about-md",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cloudbook.ravexcode.com/about-md",
  },
};

export default function Layout({children}){
  return (
    <>
      { children }
    </>
  )
}