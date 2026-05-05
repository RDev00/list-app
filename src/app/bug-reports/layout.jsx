export const metadata = {
  title: "Reportar Errores | CloudBook",
  description: "Reporta bugs y errores en CloudBook. Ayúdanos a mejorar tu experiencia reportando problemas.",
  keywords: ["reporte bugs", "reportar errores", "feedback", "contacto", "soporte"],
  openGraph: {
    title: "Reportar Errores | CloudBook",
    description: "Ayúdanos a mejorar reportando los bugs que encuentres en CloudBook.",
    url: "https://cloudbook.ravexcode.com/bug-reports",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cloudbook.ravexcode.com/bug-reports",
  },
};

export default function Layout({children}){
  return (
    <>
      { children }
    </>
  )
}
