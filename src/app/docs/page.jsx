"use client";

import Link from "next/link";

export default function DocsHome() {
  const features = [
    {
      icon: "🔐",
      title: "Seguridad de Datos",
      description: "Tus notas están encriptadas con los últimos estándares de seguridad. Solo tú tienes acceso a tu información."
    },
    {
      icon: "☁️",
      title: "Almacenamiento en la Nube",
      description: "Accede a tus notas desde cualquier dispositivo. Sincronización automática en tiempo real."
    },
    {
      icon: "🎯",
      title: "Fácil de Usar",
      description: "Interfaz intuitiva diseñada para que cualquiera pueda usarla sin necesidad de capacitación."
    },
    {
      icon: "🔄",
      title: "Sincronización",
      description: "Tus datos se sincronizan automáticamente en todos tus dispositivos al instante."
    },
    {
      icon: "📊",
      title: "Organización",
      description: "Organiza tus notas en categorías, etiquetas y listas personalizadas."
    },
    {
      icon: "🤝",
      title: "Compartir",
      description: "Comparte tus notas con otros de forma segura y controla los permisos de acceso."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">
          Documentación de CloudBook
        </h1>
        <p className="text-lg text-slate-600">
          Bienvenido a la documentación completa de CloudBook. Aquí encontrarás todo lo que necesitas para comenzar, 
          usar y aprovechar al máximo nuestra plataforma de notas seguras y encriptadas.
        </p>
      </section>

      {/* Quick Links */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Comienza Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/docs/getting-started/installation"
            className="p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <p className="font-semibold text-lg mb-2">🚀 Instalación</p>
            <p className="text-sm text-blue-100">Instala CloudBook en tu dispositivo en minutos</p>
          </Link>
          
          <Link
            href="/docs/getting-started/first-project"
            className="p-6 bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <p className="font-semibold text-lg mb-2">✨ Tu Primer Proyecto</p>
            <p className="text-sm text-purple-100">Crea tu primera nota y lista</p>
          </Link>
          
          <Link
            href="/docs/security/encryption"
            className="p-6 bg-linear-to-br from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <p className="font-semibold text-lg mb-2">🔒 Seguridad</p>
            <p className="text-sm text-green-100">Aprende cómo protegemos tus datos</p>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Características Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <p className="text-3xl mb-3">{feature.icon}</p>
              <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Secciones de Documentación</h2>
        
        <div className="space-y-4">
          {/* Getting Started */}
          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">📚 Comenzar</h3>
            <p className="text-slate-600 mb-4">
              Si eres nuevo en CloudBook, comienza aquí. Aprenderás cómo instalar, configurar e iniciar tu primer proyecto.
            </p>
            <div className="space-y-2">
              <Link href="/docs/getting-started/installation" className="block text-blue-600 hover:underline text-sm">
                → Instalación
              </Link>
              <Link href="/docs/getting-started/setup" className="block text-blue-600 hover:underline text-sm">
                → Configuración Inicial
              </Link>
              <Link href="/docs/getting-started/first-project" className="block text-blue-600 hover:underline text-sm">
                → Tu Primer Proyecto
              </Link>
            </div>
          </div>

          {/* User Guide */}
          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">👤 Guía de Usuario</h3>
            <p className="text-slate-600 mb-4">
              Domina todas las características de CloudBook. Desde crear notas hasta compartir con otros usuarios.
            </p>
            <div className="space-y-2">
              <Link href="/docs/user-guide/create-notes" className="block text-blue-600 hover:underline text-sm">
                → Crear Notas
              </Link>
              <Link href="/docs/user-guide/manage-lists" className="block text-blue-600 hover:underline text-sm">
                → Gestionar Listas
              </Link>
              <Link href="/docs/user-guide/sharing" className="block text-blue-600 hover:underline text-sm">
                → Compartir Información
              </Link>
              <Link href="/docs/user-guide/organization" className="block text-blue-600 hover:underline text-sm">
                → Organización
              </Link>
            </div>
          </div>

          {/* API */}
          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">⚙️ API</h3>
            <p className="text-slate-600 mb-4">
              Documentación técnica para desarrolladores. Integra CloudBook en tus aplicaciones usando nuestra API.
            </p>
            <div className="space-y-2">
              <Link href="/docs/api/authentication" className="block text-blue-600 hover:underline text-sm">
                → Autenticación
              </Link>
              <Link href="/docs/api/notes" className="block text-blue-600 hover:underline text-sm">
                → Endpoint de Notas
              </Link>
              <Link href="/docs/api/users" className="block text-blue-600 hover:underline text-sm">
                → Endpoint de Usuarios
              </Link>
              <Link href="/docs/api/reports" className="block text-blue-600 hover:underline text-sm">
                → Endpoint de Reportes
              </Link>
            </div>
          </div>

          {/* Security */}
          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">🔒 Seguridad</h3>
            <p className="text-slate-600 mb-4">
              Tu seguridad es nuestra prioridad. Descubre cómo protegemos tus datos y las mejores prácticas.
            </p>
            <div className="space-y-2">
              <Link href="/docs/security/encryption" className="block text-blue-600 hover:underline text-sm">
                → Encriptación de Datos
              </Link>
              <Link href="/docs/security/privacy" className="block text-blue-600 hover:underline text-sm">
                → Privacidad de Datos
              </Link>
              <Link href="/docs/security/best-practices" className="block text-blue-600 hover:underline text-sm">
                → Buenas Prácticas
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">❓ FAQ</h3>
            <p className="text-slate-600 mb-4">
              Respuestas a las preguntas más frecuentes y solución de problemas comunes.
            </p>
            <div className="space-y-2">
              <Link href="/docs/faq/common-questions" className="block text-blue-600 hover:underline text-sm">
                → Preguntas Frecuentes
              </Link>
              <Link href="/docs/faq/troubleshooting" className="block text-blue-600 hover:underline text-sm">
                → Solución de Problemas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-linear-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Necesitas Ayuda?</h2>
        <p className="text-slate-600 mb-4">
          Si no encuentras lo que buscas en esta documentación, no dudes en contactarnos.
        </p>
        <div className="space-x-4">
          <Link
            href="/bug-reports"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reportar un Bug
          </Link>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Contactar Soporte
          </Link>
        </div>
      </section>
    </div>
  );
}
