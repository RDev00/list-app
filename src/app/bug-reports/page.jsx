"use client"

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";

export default function BugReport(){

  const versions = [
    "Indev 6.2",
    "Indev 7.0",
    "Beta 1.0",
  ]

  const devices = [
    "Android",
    "Windows"
  ]

  const [bug, setBug] = useState("")
  const [steps, setSteps] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [version, setVersion] = useState(versions[0])
  const [device, setDevice] = useState(devices[0])
  const [screenshot, setScreenshot] = useState("")

  async function submitBug(data){
    try {
      const link = "http://localhost:3000/api/reports";

      const res = await fetch(link, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });

      if(!res || res.status !== 200){
        console.log("Ha ocurrido un error en el servidor")
      };

      console.log("Bug reportado exitosamente");

      setBug("");
      setSteps("");
      setEmail("");
      setDate("");
      setVersion(versions[0]);
      setDevice(devices[0]);
      setScreenshot("");
    } catch (err) {
      console.log("Ha ocurrido un error en el servidor\nerror:", err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await submitBug({
      bug,
      steps,
      email,
      date,
      version,
      device,
      screenshot
    })
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100">

      <Header isAdmin={false} />

      <main className="flex flex-col justify-center items-center px-4 py-10">

        <section className="w-full max-w-3xl bg-white rounded-xl shadow-md border-l-4 border-red-500 px-8 py-8 hover:shadow-lg transition-shadow">

          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            Reportar un error
          </h2>

          <p className="text-slate-600 text-center mb-8">
            Si encontraste un problema en CloudBook puedes reportarlo aquí para ayudarnos a mejorar la aplicación.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Describe el error <span className="text-red-600">*</span>
              </label>

              <textarea
                required
                value={bug}
                onChange={(e)=>setBug(e.target.value)}
                placeholder="Describe con el mayor detalle posible el error que encontraste. Incluye qué estabas haciendo, qué esperabas que sucediera y qué ocurrió realmente."
                className="w-full h-36 resize-none border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Pasos para reproducir el error <span className="text-red-600">*</span>
              </label>

              <textarea
                required
                value={steps}
                onChange={(e)=>setSteps(e.target.value)}
                placeholder="Ejemplo: 1. Abrir la app. 2. Crear una nota. 3. Presionar guardar. 4. La app se cierra inesperadamente."
                className="w-full h-28 resize-none border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Correo de contacto
              </label>

              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="ejemplo@email.com"
                className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Dispositivo <span className="text-red-600">*</span>
                </label>

                <select
                  value={device}
                  onChange={(e)=>setDevice(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {devices.map((d,i)=>(
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Versión de la aplicación <span className="text-red-600">*</span>
                </label>

                <select
                  value={version}
                  onChange={(e)=>setVersion(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {versions.map((v,i)=>(
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Fecha del error <span className="text-red-600">*</span>
                </label>

                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Screenshot
                </label>

                <input
                  type="url"
                  value={screenshot}
                  onChange={(e)=>setScreenshot(e.target.value)}
                  placeholder="https://imgur.com/ejemplo"
                  className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <button
              type="submit"
              className="bg-red-500 text-white font-semibold rounded-lg py-3 hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
            >
              Enviar reporte
            </button>

          </form>

        </section>

      </main>

      <Footer />

    </div>
  )
}