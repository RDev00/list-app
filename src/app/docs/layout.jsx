"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DocsLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    {
      title: "Introducción",
      href: "/docs",
      icon: "📚"
    },
    {
      title: "Comenzar",
      icon: "🚀",
      subsections: [
        { title: "Instalación", href: "/docs/getting-started/installation" },
        { title: "Configuración Inicial", href: "/docs/getting-started/setup" },
      ]
    },
    {
      title: "API",
      icon: "⚙️",
      subsections: [
        { title: "Autenticación", href: "/docs/api/authentication" },
        { title: "Notas", href: "/docs/api/notes" },
        { title: "Usuarios", href: "/docs/api/users" },
        { title: "Reportes", href: "/docs/api/reports" }
      ]
    },
    {
      title: "Seguridad",
      icon: "🔒",
      subsections: [
        { title: "Encriptación", href: "/docs/security/encryption" },
        { title: "Privacidad de Datos", href: "/docs/security/privacy" },
        { title: "Buenas Prácticas", href: "/docs/security/best-practices" }
      ]
    },
    {
      title: "FAQ",
      icon: "❓",
      subsections: [
        { title: "Preguntas Frecuentes", href: "/docs/faq/common-questions" },
        { title: "Solución de Problemas", href: "/docs/faq/troubleshooting" }
      ]
    }
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-slate-50">
      <Header />
      
      <div className="flex gap-6 px-4 py-8 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-64 shrink-0`}>
          <nav className="sticky top-8 space-y-6 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                {section.subsections ? (
                  <>
                    <p className="font-semibold text-slate-900 flex items-center gap-2">
                      {section.icon} {section.title}
                    </p>
                    <ul className="space-y-2 pl-6">
                      {section.subsections.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            href={sub.href}
                            className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors"
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={section.href}
                    className="font-semibold text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    {section.icon} {section.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {sidebarOpen ? "Cerrar Menú" : "Abrir Menú"}
          </button>
          
          <article className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 prose prose-sm max-w-none">
            {children}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
