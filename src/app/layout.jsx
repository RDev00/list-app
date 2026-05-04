import './styles/global.css';

export const metadata = {
  metadataBase: new URL("https://cloudbook.ravexcode.com"),

  title: {
    default: "CloudBook - Bloc de notas seguro",
    template: "%s | CloudBook",
  },

  verification : {
    google: "cnUsh8THBN4LdHTwYOYCDpDETj21ANSp_dpb826SJGA"
  },

  description:
    "Bloc de notas online con cifrado. Guarda tus notas de forma segura y accede desde cualquier lugar.",

  keywords: [
    "bloc de notas online",
    "bloc de notas en linea",
    "notas online",
    "app de notas web",

    "notas encriptadas",
    "notas seguras",
    "notas privadas",
    "bloc de notas seguro",
    "guardar notas con contraseña",
    "notas con cifrado",

    "guardar notas en la nube",
    "escribir notas online",
    "acceder a notas desde cualquier lugar",

    "bloc de notas online seguro gratis",
    "app de notas privada en la nube",
    "alternativa segura a google keep",
    "notas online con privacidad"
  ],

  authors: [{ name: "RavexCode" }],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "CloudBook - Notas seguras en la nube",
    description:
      "Guarda tus notas con cifrado y accede desde cualquier dispositivo.",
    url: "https://cloudbook.ravexcode.com",
    siteName: "CloudBook",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CloudBook - Notas seguras",
    description:
      "Bloc de notas online con cifrado para proteger tu información.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "/",
  },
};

export default function Layout({children}){
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}