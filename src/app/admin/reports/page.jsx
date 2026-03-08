"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function BugReports(){

  const router = useRouter()

  const [reports,setReports] = useState([])
  const [loading,setLoading] = useState(true)

  function getSession(){
    const value = `; ${document.cookie}`
    const parts = value.split(`; token=`)
    if(parts.length === 2) return parts.pop().split(";").shift()
  }

  function deleteCookie() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
  }

  const loadReports = async() => {
    const token = getSession()
    if(!token){
      router.push("/admin")
      return
    }
    try{
      const res = await fetch("/api/reports",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization": token
        }
      })
      if(res.status === 401){
        router.push("/admin")
        return
      }
      const data = await res.json()
      setReports(data.reports || [])
    }catch(err){
      console.error("Error loading reports",err)
    }finally{
      setLoading(false)
    }
  }

  const signOut = () => {
    deleteCookie();
    window.location.reload();
  }

  const deleteReport = async(reportId) => {
    setLoading(true);

    const token = getSession();
    if(!token){
      router.push("/admin")
      return
    }

    try{
      const res = await fetch(`/api/reports/${reportId}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "Authorization": token,
        }
      });

      if(res.status === 401){
        router.push("/admin")
        return
      } else if(res.status >= 500) {
        const data = await res.json();
        console.log(data)
      }

      await loadReports();

    }catch(err){
      console.error("Error loading reports",err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    loadReports()
  },[])

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100">

      <header className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold text-white tracking-tight">CloudBook</h1>
        <span className="text-white font-semibold opacity-80">Acceso interno</span>
      </header>

      <main className="flex flex-col items-center gap-8 pb-10 px-4 py-10">

        <section className="max-w-5xl w-full text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            Reportes de errores
          </h2>
          <p className="text-slate-600">
            Lista de errores reportados por usuarios de CloudBook.
          </p>
        </section>

        <button className="cursor-pointer hover:brightness-90 bg-blue-600 border-slate-400 px-6 py-2 text-center shadow-md rounded-xl text-zinc-100 font-semibold" onClick={() => {signOut()}}>
          Cerrar sesión
        </button>

        <section className="w-full max-w-5xl flex flex-col gap-6">

          {loading && (
            <div className="bg-white rounded-xl shadow-md border-l-4 border-blue-400 p-6 text-center text-slate-600">
              Cargando reportes...
            </div>
          )}

          {!loading && reports.length === 0 && (
            <div className="bg-white rounded-xl shadow-md border-l-4 border-slate-400 p-6 text-center text-slate-600">
              No hay reportes registrados.
            </div>
          )}

          {reports.map((report)=>(
            <div key={report.id} className="bg-white rounded-xl shadow-md border-l-4 border-red-500 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div className="flex gap-3 text-sm">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                    {report.device}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    v{report.version}
                  </span>
                  {/* ID del reporte */}
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold">
                    ID: {report.id}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">
                    {report.date}
                  </span>
                  {/* BOTÓN BORRAR */}
                  <button onClick={() => deleteReport(report.id)}>
                    <img src="/icons/trash.png" alt="© Icon made by FreePick" className="block aspect-square w-5 cursor-pointer hover:scale-110" title="Borrar reporte"/>
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                Error reportado
              </h3>
              <p className="text-slate-700 mb-4 whitespace-pre-wrap">
                {report.bug}
              </p>
              <h4 className="font-semibold text-slate-900 mb-1">
                Pasos para reproducir
              </h4>
              <p className="text-slate-700 mb-4 whitespace-pre-wrap">
                {report.steps}
              </p>
              {report.screenshot && (
                <a href={report.screenshot} target="_blank" className="text-blue-600 font-semibold hover:underline">
                  Ver screenshot
                </a>
              )}
              {report.email && (
                <div className="mt-4 text-sm text-slate-500">
                  Contacto: {report.email}
                </div>
              )}
            </div>
          ))}
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-200 text-center px-4 py-4 border-t border-slate-800">
        <p className="opacity-75">© 2025 - CloudBook Derechos reservados</p>
      </footer>

    </div>
  )
}