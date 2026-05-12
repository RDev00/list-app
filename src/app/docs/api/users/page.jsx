"use client";

import Link from "next/link";

export default function UsersAPI() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">API de Usuarios</h1>
        <p className="text-lg text-slate-600">
          Gestiona usuarios y perfiles a través de la API.
        </p>
      </section>

      {/* Endpoints */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Endpoints Disponibles</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">GET /api/users/profile</p>
            <p className="text-sm text-slate-700">
              Obtiene el perfil del usuario autenticado
            </p>
          </div>

          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">PUT /api/users/profile</p>
            <p className="text-sm text-slate-700">
              Actualiza el perfil del usuario
            </p>
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">GET /api/users/{'{id}'}/public</p>
            <p className="text-sm text-slate-700">
              Obtiene el perfil público de un usuario
            </p>
          </div>

          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">POST /api/users/register</p>
            <p className="text-sm text-slate-700">
              Registra un nuevo usuario
            </p>
          </div>

          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">POST /api/users/password-reset</p>
            <p className="text-sm text-slate-700">
              Inicia un proceso de restablecimiento de contraseña
            </p>
          </div>
        </div>
      </section>

      {/* Get Profile */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Obtener Perfil</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Endpoint</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">GET /api/users/profile</p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Ejemplo de Respuesta</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://...",
    "bio": "Desarrollador de software",
    "plan": "pro",
    "storageUsed": 1024000000,
    "storageLimit": 107374182400,
    "createdAt": "2023-01-15T10:30:00Z"
  }
}`}</pre>
          </div>
        </div>
      </section>

      {/* Update Profile */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Actualizar Perfil</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Endpoint</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">PUT /api/users/profile</p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Parámetros</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "name": "Jane Doe",
  "bio": "Diseñadora UX/UI",
  "avatar": "https://...",
  "language": "es",
  "timezone": "America/Mexico_City"
}`}</pre>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Registro de Usuarios</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Endpoint</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">POST /api/users/register</p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Parámetros Requeridos</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "name": "New User",
  "agreeToTerms": true
}`}</pre>
          </div>
        </div>

        <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
          <p className="text-sm text-slate-700">
            ✓ La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, números y caracteres especiales
          </p>
        </div>
      </section>

      {/* Password Reset */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Restablecimiento de Contraseña</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Paso 1: Solicitar Reset</h3>
            <p className="text-sm font-mono bg-slate-100 p-2 rounded mb-2">POST /api/users/password-reset</p>
            <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre>{`{
  "email": "user@example.com"
}`}</pre>
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Paso 2: Validar Token</h3>
            <p className="text-sm font-mono bg-slate-100 p-2 rounded mb-2">POST /api/users/password-reset/{'{token}'}/verify</p>
            <p className="text-sm text-slate-600">
              El usuario recibirá un correo con un enlace y token
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Paso 3: Establecer Nueva Contraseña</h3>
            <p className="text-sm font-mono bg-slate-100 p-2 rounded mb-2">POST /api/users/password-reset/{'{token}'}/reset</p>
            <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre>{`{
  "password": "NewSecurePassword456!"
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Two Factor Auth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Autenticación de Dos Factores</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Habilitar 2FA</h3>
            <p className="text-sm font-mono bg-slate-100 p-2 rounded">POST /api/users/2fa/enable</p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Deshabilitar 2FA</h3>
            <p className="text-sm font-mono bg-slate-100 p-2 rounded">POST /api/users/2fa/disable</p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Verificar Código 2FA</h3>
            <p className="text-sm font-mono bg-slate-100 p-2 rounded mb-2">POST /api/users/2fa/verify</p>
            <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre>{`{
  "code": "123456"
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Gestión de Dispositivos</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">GET /api/users/devices</p>
            <p className="text-sm text-slate-700">
              Lista todos los dispositivos conectados
            </p>
          </div>

          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">DELETE /api/users/devices/{'{deviceId}'}</p>
            <p className="text-sm text-slate-700">
              Desconecta un dispositivo específico
            </p>
          </div>

          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">POST /api/users/devices/logout-all</p>
            <p className="text-sm text-slate-700">
              Cierra sesión en todos los dispositivos
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Siguientes Pasos</h3>
        <div className="space-x-4 space-y-2">
          <Link
            href="/docs/api/reports"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            API de Reportes
          </Link>
          <Link
            href="/docs/security/best-practices"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Seguridad
          </Link>
        </div>
      </section>
    </div>
  );
}
