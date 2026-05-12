"use client";

import Link from "next/link";

export default function BestPractices() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Buenas Prácticas de Seguridad</h1>
        <p className="text-lg text-slate-600">
          Guía para mantener tu cuenta CloudBook segura.
        </p>
      </section>

      {/* Account Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Seguridad de Cuenta</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🔐 Contraseña Fuerte</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Mínimo 12 caracteres</li>
              <li>• Mezcla mayúsculas, minúsculas, números y símbolos</li>
              <li>• Evita información personal predecible</li>
              <li>• No reutilices contraseñas en otros sitios</li>
              <li>• Cambia regularmente (cada 90 días)</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">📲 Autenticación de Dos Factores</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>✓ Habilita 2FA desde tu panel de control</li>
              <li>✓ Usa una app autenticadora (Google Authenticator, Authy)</li>
              <li>✓ Guarda los códigos de recuperación en lugar seguro</li>
              <li>✓ Verifica los códigos periódicamente</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">📧 Correo de Recuperación</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Mantén tu correo electrónico actualizado</li>
              <li>• Verifica la dirección de recuperación</li>
              <li>• Asegúrate de poder acceder a él</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Device Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Seguridad del Dispositivo</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🖥️ Mantener Actualizado</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Instala actualizaciones de seguridad automáticamente</li>
              <li>• Mantén el sistema operativo actualizado</li>
              <li>• Actualiza navegadores y aplicaciones</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🛡️ Antivirus/Antimalware</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Instala software de seguridad confiable</li>
              <li>• Ejecuta análisis regularmente</li>
              <li>• Mantén las definiciones de virus actualizadas</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🔒 Firewall</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Usa un firewall en tu dispositivo</li>
              <li>• Configura un firewall en tu router</li>
              <li>• En redes públicas, usa una VPN</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Session Management */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Gestión de Sesiones</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">📱 Revisa Dispositivos Conectados</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Ve a Configuración → Dispositivos regularmente</li>
              <li>• Desconecta dispositivos que no reconozcas</li>
              <li>• Cierra sesión en dispositivos públicos</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">⏰ Cierre de Sesión</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Cierra sesión en dispositivos compartidos</li>
              <li>• Usa "Cerrar sesión en todos los dispositivos" si sospechas acceso no autorizado</li>
              <li>• No dejes CloudBook abierto en dispositivos públicos</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🌐 Redes Seguras</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Evita usar Wi-Fi público sin VPN</li>
              <li>• Usa redes de confianza (hogar, trabajo)</li>
              <li>• Desactiva Wi-Fi automático en dispositivos móviles</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Protección de Datos</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">💾 Copias de Seguridad</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Habilita copias de seguridad automáticas</li>
              <li>• Revisa regularmente que se realizan</li>
              <li>• Guarda copias offline en dispositivo seguro</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🏷️ Organización</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Mantén notas sensibles organizadas en carpetas específicas</li>
              <li>• Usa etiquetas para marcar contenido confidencial</li>
              <li>• Revisa regularmente permisos de compartidas</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🔍 Auditoría</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Revisa la actividad de tu cuenta regularmente</li>
              <li>• Verifica cambios recientes en configuración</li>
              <li>• Descarga reportes de seguridad periódicamente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sharing Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Seguridad al Compartir</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">✓ Verifica Destinatarios</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Confirma el correo electrónico correcto</li>
              <li>• Revisa que el correo sea del usuario correcto</li>
              <li>• Si es nuevo, verifica por otro canal</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">⚙️ Permisos Mínimos</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Otorga solo los permisos necesarios</li>
              <li>• Usa "Ver" en lugar de "Editar" cuando sea posible</li>
              <li>• Restringe acceso a documentos sensibles</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">🔗 Enlaces Seguros</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Usa contraseña en enlaces públicos</li>
              <li>• Establece fecha de expiración en enlaces</li>
              <li>• Revoca acceso cuando ya no sea necesario</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phishing & Scams */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Prevención de Phishing</h2>
        
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="font-semibold text-slate-900 mb-3">Cómo evitar estafas y phishing:</p>
          <ul className="text-sm text-slate-700 space-y-2 ml-4">
            <li>🚫 Nunca compartas contraseña por correo</li>
            <li>🚫 Desconfía de correos solicitando info personal</li>
            <li>✓ Verifica URLs antes de hacer clic</li>
            <li>✓ Busca indicadores de seguridad (candado en navegador)</li>
            <li>✓ Si en duda, contacta al soporte directamente</li>
          </ul>
        </div>
      </section>

      {/* If Compromised */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Si Tu Cuenta Fue Comprometida</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Acciones Inmediatas:</h3>
            <ol className="text-sm text-slate-700 space-y-1 ml-4">
              <li>1. Cambia tu contraseña inmediatamente</li>
              <li>2. Habilita 2FA si no está habilitado</li>
              <li>3. Revisa dispositivos conectados y desconecta extraños</li>
              <li>4. Cierra sesión en todos los dispositivos</li>
              <li>5. Revisa la actividad de tu cuenta</li>
              <li>6. Contacta al soporte de CloudBook</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Incident Reporting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Reportar un Incidente</h2>
        
        <p className="text-slate-600 mb-4">
          Si sospechas un incidente de seguridad:
        </p>

        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700 font-semibold mb-2">Contacta al Equipo de Seguridad:</p>
          <p className="text-sm text-slate-600">
            📧 security@cloudbook.ravexcode.com<br/>
            🌐 https://cloudbook.ravexcode.com/security<br/>
            📋 Incluye detalles específicos del incidente
          </p>
        </div>
      </section>

      {/* Security Updates */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Mantente Informado</h2>
        
        <ul className="space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="text-xl">📧</span>
            <span>Suscríbete a actualizaciones de seguridad</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">📰</span>
            <span>Lee nuestro blog de seguridad regularmente</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🔔</span>
            <span>Habilitanotificaciones de actividad sospechosa</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">📱</span>
            <span>Sigue nuestras redes sociales para avisos</span>
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Siguientes Pasos</h3>
        <div className="space-x-4 space-y-2">
          <Link
            href="/docs/faq/common-questions"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Preguntas Frecuentes
          </Link>
          <Link
            href="/bug-reports"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Reportar Problema
          </Link>
        </div>
      </section>
    </div>
  );
}
