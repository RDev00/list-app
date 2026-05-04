import './styles/global.css';

export const metadata = {
  metadataBase: new URL("https://cloudbook.ravexcode.com"),

  title: {
    default: "CloudBook - Bloc de notas seguro",
    template: "%s | CloudBook",
  },

  description:
    "Bloc de notas online con cifrado. Guarda tus notas de forma segura y accede desde cualquier lugar.",

  keywords: [
    "bloc de notas online",
    "notas encriptadas",
    "notas seguras",
    "notas privadas",
    "guardar notas en la nube seguro",
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