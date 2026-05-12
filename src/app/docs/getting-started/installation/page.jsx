"use client";

import Link from "next/link";

export default function Installation() {
  const platforms = [
    {
      name: "Windows",
      instructions: [
        "Descarga el instalador desde la página de descargas",
        "Ejecuta el archivo .exe",
        "Sigue el asistente de instalación",
        "¡Listo! Abre CloudBook desde el menú de inicio"
      ]
    },
    {
      name: "Android",
      instructions: [
        "Descarga el instalador desde la página de descargas",
        "Ejecuta el archivo .apk",
        "Sigue el asistente de instalación",
        "¡Listo! Abre CloudBook desde el menú de inicio"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Instalación</h1>
        <p className="text-lg text-slate-600">
          Aprende cómo instalar CloudBook en tu dispositivo. Selecciona tu plataforma para obtener instrucciones específicas.
        </p>
      </section>

      {/* System Requirements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Requisitos del Sistema</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Windows</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Windows 10 o superior</li>
              <li>• 100 MB de espacio libre</li>
              <li>• RAM: 2 GB mínimo</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Android</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Android 12+</li>
              <li>• 100 MB de espacio libre</li>
              <li>• RAM: 2 GB mínimo</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Instrucciones de Instalación</h2>
        
        <div className="space-y-6">
          {platforms.map((platform, idx) => (
            <div key={idx} className="p-6 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{platform.name}</h3>
              <ol className="space-y-3">
                {platform.instructions.map((instruction, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-slate-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Verification */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Verificar Instalación</h2>
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-slate-700 mb-3">Después de instalar CloudBook, verifica que todo funcione correctamente:</p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>✓ CloudBook inicia sin errores</li>
            <li>✓ Puedes crear una cuenta</li>
            <li>✓ La sincronización funciona</li>
            <li>✓ Puedes crear tu primera nota</li>
          </ul>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">¿Problemas?</h2>
        <p className="text-slate-600 mb-4">
          Si tienes problemas durante la instalación:
        </p>
        <ul className="space-y-2 text-slate-700">
          <li>• Verifica que tu sistema cumpla con los requisitos</li>
          <li>• Intenta descargar nuevamente el instalador</li>
          <li>• Deshabilita temporalmente tu antivirus</li>
          <li>• Consulta la <Link href="/docs/faq/troubleshooting" className="text-blue-600 hover:underline">guía de solución de problemas</Link></li>
        </ul>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Siguientes Pasos</h2>
        <p className="text-slate-600 mb-4">
          Una vez que hayas instalado CloudBook, aquí están los siguientes pasos:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/docs/getting-started/setup"
            className="p-4 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <p className="font-semibold text-blue-600 mb-1">⚙️ Configuración Inicial</p>
            <p className="text-sm text-slate-600">Aprende a configurar CloudBook según tus preferencias</p>
          </Link>
          
          <Link
            href="/docs/getting-started/first-project"
            className="p-4 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <p className="font-semibold text-purple-600 mb-1">✨ Tu Primer Proyecto</p>
            <p className="text-sm text-slate-600">Crea tu primera nota y comienza a organizarte</p>
          </Link>
        </div>
      </section>

      {/* Download Links */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Descargar CloudBook</h3>
        <p className="text-slate-600 mb-4">
          ¿Listo para instalar? Ve a nuestra página de descargas.
        </p>
        <Link
          href="/download"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Ir a Descargas
        </Link>
      </section>
    </div>
  );
}
