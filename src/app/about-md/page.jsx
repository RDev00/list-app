"use client";

import MainContainer from "@/components/main-container";
import SecondaryContainer from "@/components/secondary-container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";

export default function AboutMd() {
  const [mdLevel, setMdLevel] = useState("basic");

  return (
    <MainContainer>
      <Header isAdmin={false}/>
        <SecondaryContainer>
          <section className="px-6 py-10 w-full max-w-4xl bg-white rounded-xl shadow-md border-l-4 border-sky-500 flex flex-col gap-8">

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Guía del formato Markdown</h2>
            <p className="text-slate-600">
              Aprende a escribir notas estructuradas usando el formato <b>Markdown (.md)</b>.
              Desde lo más básico hasta técnicas avanzadas para documentación profesional.
            </p>
          </div>

          {/* Barra de niveles */}
          <div className="flex flex-col md:flex-row w-full border rounded-lg overflow-hidden shadow-sm">

            <button
              onClick={() => setMdLevel("basic")}
              className={`flex-1 py-3 font-semibold transition cursor-pointer
              ${mdLevel === "basic"
                ? "bg-sky-600 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
            >
              Nivel básico
            </button>

            <button
              onClick={() => setMdLevel("intermediate")}
              className={`flex-1 py-3 font-semibold transition cursor-pointer
              ${mdLevel === "intermediate"
                ? "bg-sky-600 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
            >
              Nivel intermedio
            </button>

            <button
              onClick={() => setMdLevel("advanced")}
              className={`flex-1 py-3 font-semibold transition cursor-pointer
              ${mdLevel === "advanced"
                ? "bg-sky-600 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
            >
              Nivel experimentado
            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

          {/* CÓDIGO */}
          <div className="bg-slate-900 text-green-400 rounded-lg p-4 text-sm overflow-auto">
          <pre>

          {mdLevel === "basic" && `# Título principal

          ## Subtítulo

          **Negritas**

          *Cursiva*

          - Elemento 1
          - Elemento 2
          - Elemento 3`}

          {mdLevel === "intermediate" && `[Enlace](https://example.com)

          ![Imagen](image.png)

          > Esto es una cita

          \`\`\`javascript
          function hello(){
            console.log("Hola");
          }
          \`\`\``}

          {mdLevel === "advanced" && `| Nombre | Edad |
          |------|------|
          | Ana | 23 |
          | Luis | 31 |

          - [x] Tarea completada
          - [ ] Tarea pendiente

          ---`}

          </pre>
          </div>

          {/* VISTA PREVIA */}
          <div className="bg-white border rounded-lg p-6 text-slate-800">

          {mdLevel === "basic" && (
          <div className="space-y-3">

          <h1 className="text-3xl font-bold">Título principal</h1>

          <h2 className="text-xl font-semibold">Subtítulo</h2>

          <p><b>Negritas</b></p>

          <p><i>Cursiva</i></p>

          <ul className="list-disc pl-6">
          <li>Elemento 1</li>
          <li>Elemento 2</li>
          <li>Elemento 3</li>
          </ul>

          </div>
          )}

          {mdLevel === "intermediate" && (
          <div className="space-y-4">

          <a className="text-blue-600 underline cursor-pointer">
          Enlace
          </a>

          <img
          src="https://picsum.photos/400/200"
          className="rounded shadow"
          />

          <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600">
          Esto es una cita
          </blockquote>

          <pre className="bg-slate-900 text-green-400 p-3 rounded text-sm">
          function hello(){"{"}
          console.log("Hola");
          {"}"}
          </pre>

          </div>
          )}

          {mdLevel === "advanced" && (
          <div className="space-y-4">

          <table className="w-full border text-sm">

          <thead className="bg-slate-100">
          <tr>
          <th className="border px-3 py-2 text-left">Nombre</th>
          <th className="border px-3 py-2 text-left">Edad</th>
          </tr>
          </thead>

          <tbody>
          <tr>
          <td className="border px-3 py-2">Ana</td>
          <td className="border px-3 py-2">23</td>
          </tr>
          <tr>
          <td className="border px-3 py-2">Luis</td>
          <td className="border px-3 py-2">31</td>
          </tr>
          </tbody>

          </table>

          <ul className="space-y-1">
          <li>✔ Tarea completada</li>
          <li>☐ Tarea pendiente</li>
          </ul>

          <hr className="my-4"/>

          </div>
          )}

          </div>

          </div>
        </section>
        </SecondaryContainer>
      <Footer />
    </MainContainer>
  )
}