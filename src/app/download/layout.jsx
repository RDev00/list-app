export const metadata = {
  title: "Descarga CloudBook | App de Notas Seguras",
  description: "Descarga CloudBook para Windows y Android. Tu aplicación de notas seguras con cifrado end-to-end.",
  keywords: ["descargar cloudbook", "app notas", "notas seguras app", "descargar app", "windows app", "android app"],
  openGraph: {
    title: "Descarga CloudBook | App de Notas Seguras",
    description: "Descarga CloudBook y disfruta de notas seguras con cifrado.",
    url: "https://cloudbook.ravexcode.com/download",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cloudbook.ravexcode.com/download",
  },
};

export default function Layout({children}){
  return (
    <>
      { children }
    </>
  )
}