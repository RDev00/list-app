"use client";

import Link from "next/link";

export default function ReportsAPI() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">API de Reportes</h1>
        <p className="text-lg text-slate-600">
          Crea, gestiona y obtén análisis de reportes a través de la API.
        </p>
      </section>

      {/* Endpoints */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Endpoints Disponibles</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">GET /api/reports</p>
            <p className="text-sm text-slate-700">
              Obtiene la lista de reportes del usuario
            </p>
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">GET /api/reports/{'{id}'}</p>
            <p className="text-sm text-slate-700">
              Obtiene un reporte específico
            </p>
          </div>

          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">POST /api/reports</p>
            <p className="text-sm text-slate-700">
              Crea un nuevo reporte
            </p>
          </div>

          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">PUT /api/reports/{'{id}'}</p>
            <p className="text-sm text-slate-700">
              Actualiza un reporte existente
            </p>
          </div>

          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="font-mono text-sm font-semibold mb-1">DELETE /api/reports/{'{id}'}</p>
            <p className="text-sm text-slate-700">
              Elimina un reporte
            </p>
          </div>
        </div>
      </section>

      {/* Creating Reports */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Crear Reporte</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Endpoint</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">POST /api/reports</p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Parámetros</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "title": "Reporte Mensual de Actividad",
  "description": "Análisis de actividad del mes de enero",
  "type": "activity",
  "dateRange": {
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  },
  "filters": {
    "tags": ["trabajo"],
    "folders": ["folder_123"]
  },
  "metrics": ["notes_created", "notes_modified", "sharing_count"],
  "format": "pdf"
}`}</pre>
          </div>
        </div>
      </section>

      {/* Report Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Tipos de Reportes</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Activity Report</h3>
            <p className="text-sm text-slate-600">
              Análisis de tu actividad en CloudBook (notas creadas, editadas, compartidas)
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Storage Report</h3>
            <p className="text-sm text-slate-600">
              Desglose del uso de almacenamiento por carpeta y tipo de contenido
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Sharing Report</h3>
            <p className="text-sm text-slate-600">
              Análisis de notas compartidas, usuarios y permisos
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Collaboration Report</h3>
            <p className="text-sm text-slate-600">
              Métrica de colaboración con otros usuarios
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Security Report</h3>
            <p className="text-sm text-slate-600">
              Auditoría de seguridad y acceso a tus datos
            </p>
          </div>
        </div>
      </section>

      {/* Getting Report Data */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Obtener Datos de Reporte</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Endpoint</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded">GET /api/reports/report_123</p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Ejemplo de Respuesta</h3>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "success": true,
  "report": {
    "id": "report_123",
    "title": "Reporte Mensual",
    "type": "activity",
    "dateRange": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31"
    },
    "data": {
      "notesCreated": 45,
      "notesModified": 120,
      "sharingCount": 15,
      "collaborators": 5
    },
    "createdAt": "2024-02-01T10:30:00Z"
  }
}`}</pre>
          </div>
        </div>
      </section>

      {/* Exporting Reports */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Exportar Reportes</h2>
        
        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Formatos Disponibles</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• <strong>PDF:</strong> Reporte formateado listo para impresión</li>
              <li>• <strong>CSV:</strong> Datos en formato de hoja de cálculo</li>
              <li>• <strong>JSON:</strong> Datos brutos en formato JSON</li>
              <li>• <strong>Excel:</strong> Archivo Excel con múltiples hojas</li>
            </ul>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Descargar Reporte</h3>
            <p className="text-sm font-mono bg-slate-100 p-2 rounded mb-2">GET /api/reports/report_123/export?format=pdf</p>
            <p className="text-sm text-slate-600">
              Obtiene el archivo del reporte en el formato especificado
            </p>
          </div>
        </div>
      </section>

      {/* Scheduling Reports */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Programar Reportes</h2>
        
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Crear Reporte Programado</h3>
          <p className="text-sm font-mono bg-slate-100 p-2 rounded mb-2">POST /api/reports/scheduled</p>
          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
            <pre>{`{
  "title": "Reporte Semanal Automático",
  "type": "activity",
  "frequency": "weekly",
  "dayOfWeek": "monday",
  "time": "09:00",
  "emailRecipients": ["user@example.com"],
  "format": "pdf"
}`}</pre>
          </div>
        </div>
      </section>

      {/* API Webhooks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Webhooks</h2>
        
        <p className="text-slate-600 mb-4">
          Recibe notificaciones cuando los reportes están listos:
        </p>

        <div className="space-y-3">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Eventos</h3>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• <code className="bg-slate-100 px-1">report.created</code></li>
              <li>• <code className="bg-slate-100 px-1">report.completed</code></li>
              <li>• <code className="bg-slate-100 px-1">report.failed</code></li>
              <li>• <code className="bg-slate-100 px-1">report.exported</code></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Mejores Prácticas</h2>
        
        <ul className="space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="text-xl">📊</span>
            <span>Usa reportes regulares para monitorear el uso</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">⏰</span>
            <span>Programa reportes automáticos para análisis periódico</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🔍</span>
            <span>Utiliza filtros para reportes específicos por carpeta o etiqueta</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">📧</span>
            <span>Configura notificaciones por correo para reportes importantes</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">💾</span>
            <span>Exporta y archiva reportes para auditoría</span>
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Siguientes Pasos</h3>
        <div className="space-x-4 space-y-2">
          <Link
            href="/docs/security/encryption"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Seguridad
          </Link>
          <Link
            href="/docs/faq/common-questions"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
