"use client";

import Link from "next/link";

export default function NotesAPI() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">API de Notas</h1>
        <p className="text-lg text-slate-600">
          Gestiona notas a través de la API de CloudBook.
        </p>
      </section>

      {/* Endpoints Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Endpoints Disponibles</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">GET /api/notes</p>
            <p className="text-sm text-slate-700">
              Obtiene la lista de todas tus notas
            </p>
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">GET /api/notes/{'{id}'}</p>
            <p className="text-sm text-slate-700">
              Obtiene los detalles de una nota específica
            </p>
          </div>

          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">POST /api/notes</p>
            <p className="text-sm text-slate-700">
              Crea una nueva nota
            </p>
          </div>

          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">PUT /api/notes/{'{id}'}</p>
            <p className="text-sm text-slate-700">
              Actualiza una nota existente
            </p>
          </div>

          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">DELETE /api/notes/{'{id}'}</p>
            <p className="text-sm text-slate-700">
              Elimina una nota
            </p>
          </div>
        </div>
      </section>

      {/* Creating Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Crear Nota</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Endpoint</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">POST /api/notes</p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Parámetros</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "title": "Mi Primera Nota",
  "content": "Contenido de la nota",
  "type": "text",
  "tags": ["importante", "trabajo"],
  "encrypted": true,
  "folderId": "folder_123"
}`}</pre>
          </div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Ejemplo de Respuesta</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "success": true,
  "note": {
    "id": "note_123",
    "title": "Mi Primera Nota",
    "content": "Contenido de la nota",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}`}</pre>
          </div>
        </div>
      </section>

      {/* Retrieving Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Obtener Notas</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Listar Todas las Notas</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded mb-2">GET /api/notes</p>
          <p className="text-sm text-slate-600">
            Parámetros opcionales: limit, skip, sort, filter
          </p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Nota Específica</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">GET /api/notes/note_123</p>
        </div>
      </section>

      {/* Updating Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Actualizar Nota</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Endpoint</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">PUT /api/notes/note_123</p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Parámetros</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "title": "Nota Actualizada",
  "content": "Contenido actualizado",
  "tags": ["urgente"]
}`}</pre>
          </div>
        </div>
      </section>

      {/* Deleting Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Eliminar Nota</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Endpoint</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">DELETE /api/notes/note_123</p>
        </div>

        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
          <p className="text-sm text-slate-700">
            ⚠️ Esta acción es permanente. Las notas eliminadas van a la papelera primero.
          </p>
        </div>
      </section>

      {/* Rate Limiting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Límites de Velocidad</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <p className="font-semibold text-slate-900 mb-1">Límites por Plan</p>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• <strong>Gratuito:</strong> 100 requests/hora</li>
              <li>• <strong>Pro:</strong> 1000 requests/hora</li>
              <li>• <strong>Business:</strong> 10000 requests/hora</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Error Responses */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Errores Comunes</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">400 Bad Request</p>
            <p className="text-sm text-slate-700">
              Validación fallida o parámetros inválidos
            </p>
          </div>

          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">404 Not Found</p>
            <p className="text-sm text-slate-700">
              La nota no existe o fue eliminada
            </p>
          </div>

          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">409 Conflict</p>
            <p className="text-sm text-slate-700">
              Conflicto de versión o duplicado
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Siguientes Pasos</h3>
        <div className="space-x-4 space-y-2">
          <Link
            href="/docs/api/users"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            API de Usuarios
          </Link>
          <Link
            href="/docs/api/reports"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            API de Reportes
          </Link>
        </div>
      </section>
    </div>
  );
}
