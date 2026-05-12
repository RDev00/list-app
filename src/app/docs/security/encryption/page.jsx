"use client";

import Link from "next/link";

export default function Encryption() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Encriptación de Datos</h1>
        <p className="text-lg text-slate-600">
          Entender cómo CloudBook protege tus datos con encriptación.
        </p>
      </section>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">¿Por Qué Encriptación?</h2>
        
        <p className="text-slate-600 mb-4">
          La encriptación asegura que solo tú puedas acceder a tus notas. Incluso CloudBook no puede leer tus datos encriptados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg text-center">
            <p className="text-2xl mb-2">🔐</p>
            <p className="font-semibold text-slate-900">Seguridad</p>
            <p className="text-sm text-slate-600">Protección total contra acceso no autorizado</p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg text-center">
            <p className="text-2xl mb-2">🤐</p>
            <p className="font-semibold text-slate-900">Privacidad</p>
            <p className="text-sm text-slate-600">Solo tú tienes acceso a tu información</p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg text-center">
            <p className="text-2xl mb-2">✅</p>
            <p className="font-semibold text-slate-900">Cumplimiento</p>
            <p className="text-sm text-slate-600">Conforme con regulaciones de privacidad</p>
          </div>
        </div>
      </section>

      {/* Key Management */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Gestión de Claves</h2>
        
        <p className="text-slate-600 mb-4">
          CloudBook implementa prácticas de seguridad de clase empresarial para la gestión de claves:
        </p>

        <div className="space-y-3">
          <div className="flex gap-3 p-4 border border-slate-200 rounded-lg">
            <span className="text-xl">🔑</span>
            <div>
              <p className="font-semibold text-slate-900">Generación de Claves</p>
              <p className="text-sm text-slate-600">Claves generadas usando generadores criptográficos seguros</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 border border-slate-200 rounded-lg">
            <span className="text-xl">🏦</span>
            <div>
              <p className="font-semibold text-slate-900">Almacenamiento</p>
              <p className="text-sm text-slate-600">Claves almacenadas en módulos de seguridad de hardware (HSM)</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 border border-slate-200 rounded-lg">
            <span className="text-xl">🔄</span>
            <div>
              <p className="font-semibold text-slate-900">Rotación</p>
              <p className="text-sm text-slate-600">Cambio periódico de claves para máxima seguridad</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 border border-slate-200 rounded-lg">
            <span className="text-xl">📋</span>
            <div>
              <p className="font-semibold text-slate-900">Auditoría</p>
              <p className="text-sm text-slate-600">Registro completo de acceso a claves</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Cómo Funciona</h2>
        
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <ol className="space-y-4 text-slate-700">
            <li>
              <p className="font-semibold">1. Crear Nota</p>
              <p className="text-sm">Escribes una nota en CloudBook</p>
            </li>
            <li>
              <p className="font-semibold">2. Encriptar Localmente</p>
              <p className="text-sm">La nota se encripta en tu dispositivo usando tu clave privada</p>
            </li>
            <li>
              <p className="font-semibold">3. Enviar Encriptada</p>
              <p className="text-sm">Los datos encriptados se envían a través de HTTPS a CloudBook</p>
            </li>
            <li>
              <p className="font-semibold">4. Almacenar Seguro</p>
              <p className="text-sm">CloudBook almacena los datos encriptados sin poder leerlos</p>
            </li>
            <li>
              <p className="font-semibold">5. Desencriptar en Dispositivo</p>
              <p className="text-sm">Al abrir la nota, se desencripta localmente en tu dispositivo</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Zero Knowledge */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Arquitectura Zero-Knowledge</h2>
        
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700 mb-3">
            CloudBook implementa una arquitectura "Zero-Knowledge", lo que significa:
          </p>
          <ul className="text-sm text-slate-700 space-y-2 ml-4">
            <li>✓ CloudBook nunca tiene acceso a tus datos desencriptados</li>
            <li>✓ Solo tú tienes control de tus claves de encriptación</li>
            <li>✓ Incluso nuestro personal no puede acceder a tu contenido</li>
            <li>✓ Incluso si CloudBook fuera hackeado, tus datos permanecerían seguros</li>
          </ul>
        </div>
      </section>

      {/* Encryption Options */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Opciones de Encriptación</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Encriptación por Defecto</h3>
            <p className="text-sm text-slate-600">
              Todas las notas se encriptan automáticamente al crear
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Notas Públicas</h3>
            <p className="text-sm text-slate-600">
              Opcionalmente, puedes crear notas no encriptadas para compartir públicamente
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Encriptación Compartida</h3>
            <p className="text-sm text-slate-600">
              Las notas compartidas se encriptan con claves que comparten solo contigo
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Mejores Prácticas</h2>
        
        <ul className="space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="text-xl">🔐</span>
            <span>Mantén tu contraseña fuerte y única</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">📲</span>
            <span>Habilita autenticación de dos factores</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">💾</span>
            <span>Guarda tu frase de recuperación en un lugar seguro</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🔄</span>
            <span>Cambia tu contraseña regularmente</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🖥️</span>
            <span>Mantén tu dispositivo actualizado y protegido</span>
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Siguientes Pasos</h3>
        <div className="space-x-4 space-y-2">
          <Link
            href="/docs/security/privacy"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Privacidad de Datos
          </Link>
          <Link
            href="/docs/security/best-practices"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Buenas Prácticas
          </Link>
        </div>
      </section>
    </div>
  );
}
