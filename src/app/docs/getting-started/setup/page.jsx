"use client";

import Link from "next/link";

export default function Setup() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Configuración Inicial</h1>
        <p className="text-lg text-slate-600">
          Configura CloudBook según tus necesidades y preferencias personales.
        </p>
      </section>

      {/* Account Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Configuración de Cuenta</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">1. Crear tu Cuenta</h3>
            <p className="text-slate-600 mb-3">
              Abre CloudBook y selecciona "Registrarse" para crear una nueva cuenta.
            </p>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Ingresa tu correo electrónico</li>
              <li>• Crea una contraseña segura (mínimo 8 caracteres)</li>
              <li>• Confirma tu correo electrónico</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">2. Configurar Perfil</h3>
            <p className="text-slate-600 mb-3">
              Completa tu información de perfil:
            </p>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Nombre completo</li>
              <li>• Foto de perfil (opcional)</li>
              <li>• Biografía personal (opcional)</li>
              <li>• Idioma preferido</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Preferencias de la Aplicación</h2>
        
        <div className="space-y-4">

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Almacenamiento</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Ubicación de almacenamiento local</li>
              <li>• Limpieza automática de caché</li>
              <li>• Copias de seguridad automáticas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Mejores Prácticas</h2>
        
        <ul className="space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="text-xl">🔐</span>
            <span>Usa una contraseña fuerte y única</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">⏰</span>
            <span>Revisa tu actividad regularmente</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🔄</span>
            <span>Mantén CloudBook actualizado</span>
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">¿Listo para empezar?</h3>
        <p className="text-slate-600 mb-4">
          Una vez que hayas completado la configuración inicial, estás listo para crear tu primera nota.
        </p>
        <Link
          href="/docs/getting-started/first-project"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Crear Tu Primer Proyecto
        </Link>
      </section>
    </div>
  );
}
