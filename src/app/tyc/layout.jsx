export const metadata = {
  title: "Términos y Condiciones | CloudBook",
  description: "Lee nuestros Términos y Condiciones de uso de CloudBook. Información sobre privacidad, derechos y responsabilidades.",
  keywords: ["términos y condiciones", "privacidad", "política privacidad", "cloudbook terms"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Términos y Condiciones | CloudBook",
    description: "Términos y Condiciones de CloudBook.",
    url: "https://cloudbook.ravexcode.com/tyc",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cloudbook.ravexcode.com/tyc",
  },
};

export default function Layout({children}){
  return (
    <>
      { children }
    </>
  )
}