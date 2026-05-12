"use client";

import Link from "next/link";

export default function Privacy() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacidad de Datos</h1>
        <p className="text-lg text-slate-600">
          Cómo CloudBook protege y respeta tu privacidad.
        </p>
      </section>

      {/* Privacy Principles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Principios de Privacidad</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🎯 Minimización de Datos</h3>
            <p className="text-sm text-slate-600">
              CloudBook solo recopila datos esenciales para proporcionar el servicio
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🔐 Cifrado de Datos</h3>
            <p className="text-sm text-slate-600">
              Todos tus datos están encriptados, tanto en tránsito como en reposo
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🚫 No Vender Datos</h3>
            <p className="text-sm text-slate-600">
              CloudBook nunca vende, comparte o utiliza tus datos con terceros
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">📋 Transparencia</h3>
            <p className="text-sm text-slate-600">
              Eres informado de cualquier cambio en nuestra política de privacidad
            </p>
          </div>
        </div>
      </section>

      {/* Data Collection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Datos que Recopilamos</h2>
        
        <p className="text-slate-600 mb-4">
          CloudBook solo recopila la información necesaria para proporcionar nuestros servicios:
        </p>

        <div className="space-y-3">
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <p className="font-semibold text-slate-900 mb-1">Datos de Cuenta</p>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Nombre y correo electrónico</li>
              <li>• Contraseña (hasheada)</li>
              <li>• Información de perfil (opcional)</li>
            </ul>
          </div>

          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <p className="font-semibold text-slate-900 mb-1">Contenido</p>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Tus notas (encriptadas)</li>
              <li>• Carpetas y etiquetas</li>
              <li>• Archivos adjuntos (encriptados)</li>
            </ul>
          </div>

          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <p className="font-semibold text-slate-900 mb-1">Datos de Uso</p>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Fecha/hora de acceso (sin contenido)</li>
              <li>• Tipo de dispositivo</li>
              <li>• IP anonimizada</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Rights */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Tus Derechos de Privacidad</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🔍 Derecho a Acceder</h3>
            <p className="text-sm text-slate-600">
              Puedes solicitar y descargar todos tus datos en cualquier momento
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">✏️ Derecho a Rectificar</h3>
            <p className="text-sm text-slate-600">
              Puedes actualizar o corregir tu información en tu perfil
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🗑️ Derecho a Eliminar</h3>
            <p className="text-sm text-slate-600">
              Puedes solicitar la eliminación de tu cuenta y todos tus datos
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🚫 Derecho a Objetar</h3>
            <p className="text-sm text-slate-600">
              Puedes rechazar ciertos tipos de procesamiento de datos
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">📦 Derecho a Portabilidad</h3>
            <p className="text-sm text-slate-600">
              Puedes descargar tus datos en un formato portátil
            </p>
          </div>
        </div>
      </section>

      {/* GDPR Compliance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Cumplimiento Normativo</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-semibold text-slate-900 mb-1">✓ GDPR (UE)</p>
            <p className="text-sm text-slate-600">
              Cumplimiento total con el Reglamento General de Protección de Datos
            </p>
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-semibold text-slate-900 mb-1">✓ CCPA (California)</p>
            <p className="text-sm text-slate-600">
              Conformidad con la Ley de Privacidad del Consumidor de California
            </p>
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-semibold text-slate-900 mb-1">✓ SOC 2</p>
            <p className="text-sm text-slate-600">
              Certificación de Organización de Servicio Confiable
            </p>
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-semibold text-slate-900 mb-1">✓ ISO 27001</p>
            <p className="text-sm text-slate-600">
              Estándar internacional de gestión de la seguridad de la información
            </p>
          </div>
        </div>
      </section>

      {/* Data Retention */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Retención de Datos</h2>
        
        <p className="text-slate-600 mb-4">
          Cómo mantenemos tus datos:
        </p>

        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Datos Activos</h3>
            <p className="text-sm text-slate-600">
              Mientras tu cuenta esté activa, tus notas se almacenan indefinidamente
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Papelera</h3>
            <p className="text-sm text-slate-600">
              Notas eliminadas se retienen 30 días en la papelera antes de borrase permanentemente
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Cuenta Eliminada</h3>
            <p className="text-sm text-slate-600">
              Después de eliminar tu cuenta, todos los datos se borran dentro de 90 días
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Logs de Auditoria</h3>
            <p className="text-sm text-slate-600">
              Se retienen durante 1 año para propósitos de seguridad y cumplimiento
            </p>
          </div>
        </div>
      </section>

      {/* Third Parties */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Terceros</h2>
        
        <p className="text-slate-600 mb-4">
          CloudBook trabaja únicamente con proveedores de confianza que cumplen nuestras políticas de privacidad:
        </p>

        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Infraestructura</h3>
            <p className="text-sm text-slate-600">
              Servidores alojados en proveedores certificados (Supabase, vercel)
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
            <p className="text-sm text-slate-600">
              Nodemailer para envío seguro de correos
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Análisis</h3>
            <p className="text-sm text-slate-600">
              Sin análisis de contenido. Solo métricas anonimizadas de uso
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Contacto</h2>
        
        <p className="text-slate-600 mb-4">
          Si tienes preguntas sobre privacidad o deseas ejercer tus derechos:
        </p>

        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700 font-semibold mb-2">Equipo de Privacidad de CloudBook</p>
          <p className="text-sm text-slate-600">
            📧 privacy@cloudbook.ravexcode.com<br/>
            🌐 https://cloudbook.ravexcode.com<br/>
            📋 Ver nuestra política completa de privacidad
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Siguientes Pasos</h3>
        <div className="space-x-4 space-y-2">
          <Link
            href="/docs/security/best-practices"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buenas Prácticas
          </Link>
          <Link
            href="/docs/security/encryption"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Encriptación
          </Link>
        </div>
      </section>
    </div>
  );
}
