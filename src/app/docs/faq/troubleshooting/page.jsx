"use client";

import Link from "next/link";
import { useState } from "react";

export default function Troubleshooting() {
  const [expandedProblems, setExpandedProblems] = useState({});

  const problems = [
    {
      id: 1,
      title: "CloudBook no sincroniza",
      symptoms: "Las notas no se actualizan en otros dispositivos",
      solutions: [
        "Verifica que tengas conexión a Internet activa",
        "Cierra y reabre CloudBook",
        "Ve a Configuración → Sincronización y haz clic en 'Sincronizar Ahora'",
        "Reinicia tu dispositivo",
        "Si el problema persiste, verifica si hay una actualización disponible"
      ]
    },
    {
      id: 2,
      title: "No puedo crear nuevas notas",
      symptoms: "Se muestra error al intentar crear una nota",
      solutions: [
        "Verifica que no hayas excedido tu límite de almacenamiento",
        "Elimina algunas notas o actualiza a un plan con mayor almacenamiento",
        "Intenta crear una nota de texto simple primero",
        "Cierra y reabre la aplicación",
        "Contacta al soporte si el problema continúa"
      ]
    },
    {
      id: 3,
      title: "Mi contraseña no funciona",
      symptoms: "Error de autenticación al intentar iniciar sesión",
      solutions: [
        "Verifica que la tecla MAYÚS no esté activada",
        "Intenta con la contraseña en mayúsculas/minúsculas correctas",
        "Usa la función 'Olvidé mi contraseña' para restablecerla",
        "Borra los datos de navegador y cookies si usas la versión web",
        "Prueba desde otro navegador o dispositivo"
      ]
    },
    {
      id: 4,
      title: "Las notas compartidas no se actualizan",
      symptoms: "Los cambios en notas compartidas no aparecen en el otro usuario",
      solutions: [
        "Asegúrate de que el otro usuario tiene permiso 'Editar'",
        "Pide al otro usuario que recargue o sincronice",
        "Verifica la conexión a Internet de ambos",
        "Intenta descompartir y compartir nuevamente",
        "Si persiste, verifica si hay una actualización disponible"
      ]
    },
    {
      id: 5,
      title: "Recibo error 429 (Too Many Requests)",
      symptoms: "API devuelve error de límite de velocidad",
      solutions: [
        "Espera 1 hora antes de reintentar",
        "Reduce la cantidad de requests simultáneos",
        "Si uses API, considera usar batching para combinar solicitudes",
        "Actualiza a un plan superior si necesitas más límite"
      ]
    },
    {
      id: 6,
      title: "No puedo habilitar 2FA",
      symptoms: "Error al intentar activar autenticación de dos factores",
      solutions: [
        "Descarga una app autenticadora (Google Authenticator, Authy, Microsoft Authenticator)",
        "Asegúrate de que tu reloj de dispositivo esté sincronizado",
        "Intenta deshabilitar 2FA y habilitarlo nuevamente",
        "Si el código QR no escanea, usa la clave manual",
        "Contacta al soporte si el problema persiste"
      ]
    },
    {
      id: 7,
      title: "Los archivos adjuntos no se cargan",
      symptoms: "Error al intentar adjuntar archivos a una nota",
      solutions: [
        "Verifica que el archivo no exceda el límite de tamaño (50MB máximo)",
        "Intenta con un archivo más pequeño primero",
        "Comprueba tu conexión a Internet",
        "Vacía el caché de la aplicación",
        "Intenta desde otro navegador o dispositivo"
      ]
    },
    {
      id: 8,
      title: "Recibo errores de encriptación",
      symptoms: "Mensajes de error relacionados con encriptación",
      solutions: [
        "Actualiza CloudBook a la última versión",
        "Reinicia tu dispositivo",
        "Vacía el caché y datos de aplicación",
        "Intenta desinstalar y reinstalar CloudBook",
        "Contacta al soporte con el código de error exacto"
      ]
    },
    {
      id: 9,
      title: "Mi nota aparece bloqueada",
      symptoms: "No puedo editar una nota, está en modo solo lectura",
      solutions: [
        "Verifica que eres el propietario de la nota",
        "Si fue compartida, pide al propietario que te otorgue permiso de edición",
        "Si es tu nota, intenta cerrar y reabrirla",
        "Verifica que no esté archivada (Más opciones → Archivar)",
        "Contacta al propietario si fue compartida"
      ]
    },
    {
      id: 10,
      title: "Recibo spam o correos de verificación no solicitados",
      symptoms: "Correos extraños de CloudBook",
      solutions: [
        "Verifica que vengan de 'mail@cloudbook.ravexcode.com'",
        "No hagas clic en enlaces si sospechas que es phishing",
        "Cambia tu contraseña si fuiste hackeado",
        "Revisa tu cuenta para actividades sospechosas",
        "Reporta el correo como spam/phishing"
      ]
    },
    {
      id: 11,
      title: "CloudBook está muy lento",
      symptoms: "La aplicación tarda mucho en responder",
      solutions: [
        "Verifica tu velocidad de conexión a Internet",
        "Cierra otras aplicaciones que usen mucha RAM",
        "Limpia el caché de CloudBook",
        "Intenta sincronizar sin descargar archivos grandes",
        "Si es la web, prueba con otro navegador o incógnito"
      ]
    },
    {
      id: 12,
      title: "Mis datos no aparecen en otro dispositivo",
      symptoms: "Una nota está en un dispositivo pero no en otro",
      solutions: [
        "Asegúrate de estar iniciando sesión con la misma cuenta",
        "Espera a que se complete la sincronización inicial",
        "Fuerza una sincronización manual",
        "Verifica la fecha y hora del dispositivo",
        "Intenta reiniciar ambos dispositivos"
      ]
    }
  ];

  const toggleProblem = (id) => {
    setExpandedProblems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Solución de Problemas</h1>
        <p className="text-lg text-slate-600">
          Guía para resolver los problemas más comunes en CloudBook.
        </p>
      </section>

      {/* General Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Pasos Generales de Solución</h2>
        
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-slate-900 mb-3">Intenta estos pasos antes de reportar un problema:</p>
          <ol className="text-sm text-slate-700 space-y-2 ml-4">
            <li>1. <strong>Reinicia la aplicación</strong> - Cierra completamente CloudBook y reabrela</li>
            <li>2. <strong>Revisa tu conexión</strong> - Asegúrate de tener Internet activo</li>
            <li>3. <strong>Actualiza la aplicación</strong> - Descarga la última versión disponible</li>
            <li>4. <strong>Sincroniza</strong> - Ve a Configuración y haz clic en "Sincronizar Ahora"</li>
            <li>5. <strong>Reinicia tu dispositivo</strong> - A veces esto resuelve problemas</li>
            <li>6. <strong>Limpia caché</strong> - Borra datos de caché de la aplicación</li>
          </ol>
        </div>
      </section>

      {/* Troubleshooting Guide */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Problemas y Soluciones</h2>
        
        <div className="space-y-3">
          {problems.map(problem => (
            <div
              key={problem.id}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleProblem(problem.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors text-left"
              >
                <div>
                  <p className="font-semibold text-slate-900">{problem.title}</p>
                  <p className="text-sm text-slate-600">{problem.symptoms}</p>
                </div>
                <span className="text-xl text-slate-600 ml-2 flex-shrink-0">
                  {expandedProblems[problem.id] ? "−" : "+"}
                </span>
              </button>
              
              {expandedProblems[problem.id] && (
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                  <p className="font-semibold text-slate-900 mb-2 text-sm">Soluciones:</p>
                  <ol className="text-sm text-slate-700 space-y-1 ml-4">
                    {problem.solutions.map((solution, idx) => (
                      <li key={idx}>{idx + 1}. {solution}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Browser Issues */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Problemas de Navegador Web</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Página en Blanco</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Presiona Ctrl+Shift+Delete (Cmd+Shift+Delete en Mac)</li>
              <li>• Selecciona "Todo el tiempo" y haz clic en "Borrar datos"</li>
              <li>• Recarga la página</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">CloudBook No Carga</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Intenta abrir en modo incógnito/privado</li>
              <li>• Intenta desde otro navegador</li>
              <li>• Desactiva extensiones del navegador temporalmente</li>
              <li>• Comprueba si el sitio está en mantenimiento</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Error de Certificado SSL</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Verifica la fecha/hora de tu dispositivo</li>
              <li>• Intenta desde otro navegador</li>
              <li>• Limpia el caché del navegador</li>
              <li>• Contacta al soporte si persiste</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Optimización de Rendimiento</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Para Aplicaciones de Escritorio</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Libera memoria cierre otras aplicaciones</li>
              <li>• Limpia archivos temporales</li>
              <li>• Desactiva animaciones si tu dispositivo es lento</li>
              <li>• Reduce el tamaño de la caché</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Para Aplicación Web</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Limpia el caché del navegador regularmente</li>
              <li>• Usa una versión reciente de tu navegador</li>
              <li>• Intenta con menos pestañas abiertas</li>
              <li>• Desactiva extensiones innecesarias</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Aún Necesitas Ayuda?</h2>
        
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700 mb-3">
            Si ninguna de estas soluciones funcionó, por favor contacta a nuestro equipo de soporte:
          </p>
          <div className="space-y-2 text-sm text-slate-600">
            <p>📧 <strong>Email:</strong> support@cloudbook.ravexcode.com</p>
            <p>🔗 <strong>Website:</strong> https://cloudbook.ravexcode.com</p>
            <p>📋 <strong>Incluye:</strong> Tu sistema operativo, versión de CloudBook, y una descripción detallada del problema</p>
          </div>
        </div>
      </section>

      {/* Report Bug */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">¿Encontraste un Bug?</h3>
        <p className="text-slate-600 mb-4">
          Ayúdanos a mejorar reportando bugs y problemas en nuestro sitio de reportes.
        </p>
        <Link
          href="/bug-reports"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Reportar Bug
        </Link>
      </section>
    </div>
  );
}
