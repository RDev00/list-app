"use client"

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState, useRef } from "react";

export default function BugReport(){
  const snackBarContainer = useRef(null);
  const [ message, setMessage ] = useState("");

  const versions = [
    "Indev 6.2",
    "Indev 7.0",
    "Beta 1.0",
    "Beta 1.2",
    "Beta 1.3",
    "1.0.0",
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

  const showSnackbar = (message, type) => {
    if(!snackBarContainer.current) return;
    const snackBar = snackBarContainer.current;

    setMessage(message);
    snackBar.classList.remove("bg-red-500");
    snackBar.classList.remove("bg-red-500");

    if(type === "success") {
      snackBar.classList.add("bg-green-500");
      snackBar.classList.remove("hidden");
    } else if(type === "error") {
      snackBar.classList.add("bg-red-500");
      snackBar.classList.remove("hidden");
    } else return;

    setTimeout(() => {
      snackBar.classList.add("hidden");
      snackBar.classList.remove("bg-red-500");
      snackBar.classList.remove("bg-red-500");
    }, 2000);
  }

  async function submitBug(data){
    try {
      const link = "/api/reports";

      const res = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cloudbook-api-key": process.env.NEXT_PUBLIC_API_KEY
        },
        body: JSON.stringify(data),
      });

      if(!res || res.status !== 200){
        const resData = await res.json();
        return showSnackbar(`${resData.message || "Ha ocurrido un error al enviar el reporte"}. Error: ${resData.error}`, "error");
      };

      setBug("");
      setSteps("");
      setEmail("");
      setDate("");
      setVersion(versions[0]);
      setDevice(devices[0]);
      setScreenshot("");

      const resData = await res.json();
      showSnackbar(resData.message, "success");
    } catch (err) {
      return showSnackbar(`Ha ocurrido un error en el servidor. Error: ${err.message}`, "error");
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
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-linear-to-b from-slate-50 to-slate-100">

      <Header isAdmin={false} />

      <main className="flex flex-col justify-center items-center px-4 py-10">

        <section className="w-full max-w-3xl bg-white rounded-xl shadow-md border-l-4 border-red-500 px-8 py-8 hover:shadow-lg transition-shadow animate-fade-in-up">

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

        <section ref={snackBarContainer} className="px-6 py-3 rounded-md fixed left-1/2 -translate-1/2 bottom-15 bg-green-500 text-white shadow-lg/20 hidden">
          {message}
        </section>

      </main>

      <Footer />

    </div>
  )
}