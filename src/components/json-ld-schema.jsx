/**
 * Componente para inyectar JSON-LD Schema en la página
 * Mejora el SEO con structured data para Google
 */

export default function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CloudBook",
    alternateName: "CloudBook - Bloc de notas seguro",
    description: "Aplicación de bloc de notas online con cifrado de seguridad end-to-end",
    url: "https://cloudbook.ravexcode.com",
    image: "https://cloudbook.ravexcode.com/og-image.png",
    author: {
      "@type": "Organization",
      name: "RavexCode",
      url: "https://cloudbook.ravexcode.com",
    },
    publisher: {
      "@type": "Organization",
      name: "RavexCode",
    },
    operatingSystem: ["Windows", "macOS", "Web"],
    applicationCategory: "Productivity",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://cloudbook.ravexcode.com/download",
    },
    features: [
      "Cifrado de notas",
      "Acceso desde cualquier dispositivo",
      "Notas privadas y seguras",
      "Sincronización en la nube",
      "Interfaz amigable",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
