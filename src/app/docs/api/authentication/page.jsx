"use client";

import Link from "next/link";

export default function Authentication() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Autenticación API</h1>
        <p className="text-lg text-slate-600">
          Autentica tus solicitudes a la API de CloudBook.
        </p>
      </section>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Descripción General</h2>
        
        <p className="text-slate-600 mb-4">
          CloudBook API utiliza autenticación basada en JWT (JSON Web Tokens) para proteger los recursos. Todos los requests a la API deben incluir un token válido en el header de autorización.
        </p>
      </section>

      {/* Authentication Methods */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Métodos de Autenticación</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">JWT Token</h3>
            <p className="text-slate-600 text-sm mb-2">
              Método recomendado para autenticación segura.
            </p>
            <p className="text-xs text-slate-500">
              Mejor para: Aplicaciones web, aplicaciones móviles, integraciones de terceros
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">API Key</h3>
            <p className="text-slate-600 text-sm mb-2">
              Clave simple para aplicaciones de menor seguridad.
            </p>
            <p className="text-xs text-slate-500">
              Mejor para: Scripts, herramientas internas, desarrollo
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">OAuth 2.0</h3>
            <p className="text-slate-600 text-sm mb-2">
              Delegación de autorización segura.
            </p>
            <p className="text-xs text-slate-500">
              Mejor para: Aplicaciones que acceden en nombre del usuario
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Comenzar</h2>
        
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <h3 className="font-semibold text-slate-900">Paso 1: Registrar tu Aplicación</h3>
          <ol className="text-sm text-slate-700 space-y-1 ml-4">
            <li>1. Ve a tu panel de control</li>
            <li>2. Selecciona "Aplicaciones" → "Nueva Aplicación"</li>
            <li>3. Ingresa el nombre y descripción</li>
            <li>4. Configura la URL de redirección</li>
            <li>5. Copia tu Client ID y Client Secret</li>
          </ol>
        </div>
      </section>

      {/* JWT Authentication */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Autenticación JWT</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">1. Obtener Token</h3>
            <p className="text-sm text-slate-600 mb-3">
              Realiza un POST a /api/auth/login con credenciales:
            </p>
            <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre>{`curl -X POST https://api.cloudbook.com/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "password"
  }'`}</pre>
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">2. Usar Token</h3>
            <p className="text-sm text-slate-600 mb-3">
              Incluye el token en el header Authorization:
            </p>
            <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre>{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5...`}</pre>
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">3. Hacer Request</h3>
            <p className="text-sm text-slate-600 mb-3">
              Realiza tu solicitud con el token:
            </p>
            <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre>{`curl -X GET https://api.cloudbook.com/notes \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5..."`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Response Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Estructura de Respuesta</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-3">Respuesta de Login Exitosa</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "expiresIn": 3600
}`}</pre>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Manejo de Errores</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">401 Unauthorized</p>
            <p className="text-sm text-slate-700">
              El token es inválido, expirado o falta
            </p>
          </div>

          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">403 Forbidden</p>
            <p className="text-sm text-slate-700">
              No tienes permisos para acceder a este recurso
            </p>
          </div>

          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">429 Too Many Requests</p>
            <p className="text-sm text-slate-700">
              Has excedido el límite de requests. Espera antes de intentar nuevamente
            </p>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Mejores Prácticas de Seguridad</h2>
        
        <ul className="space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="text-xl">🔐</span>
            <span>Nunca guardes el Client Secret en el código frontend</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🔑</span>
            <span>Usa HTTPS para todos los requests API</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">⏰</span>
            <span>Refresca tokens regularmente antes de que expiren</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🛡️</span>
            <span>Valida y sanitiza todos los inputs</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">📊</span>
            <span>Monitorea el uso de tu API key</span>
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Siguientes Pasos</h3>
        <div className="space-x-4 space-y-2">
          <Link
            href="/docs/api/notes"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            API de Notas
          </Link>
          <Link
            href="/docs/api/users"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            API de Usuarios
          </Link>
        </div>
      </section>
    </div>
  );
}
