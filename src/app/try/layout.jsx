export const metadata = {
  title: "Prueba CloudBook | Bloc de Notas Online",
  description: "Prueba CloudBook completamente gratis. Crea notas, listas y documenta tu información con cifrado de seguridad.",
  keywords: ["prueba gratis", "bloc notas online gratis", "app notas online", "prueba cloudbook", "notas seguras gratis"],
  openGraph: {
    title: "Prueba CloudBook Gratis | Bloc de Notas Online",
    description: "Crea notas seguras sin necesidad de registrarse. ¡Prueba CloudBook ahora!",
    url: "https://cloudbook.ravexcode.com/try",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cloudbook.ravexcode.com/try",
  },
};

export default function Layout({children}){
  return (
    <>
      { children }
    </>
  )
}