"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const saveCookie = (token) => {
    const date = new Date();
    date.setTime(date.getTime() + (4 * 60 * 60 * 1000));
    document.cookie = `token=${token};expires=${date.toUTCString()};path=/`;
  }

  const showSnackbar = (message, type="success") => {
    setSnackbar({ show: true, message, type });

    setTimeout(() => {
      setSnackbar({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try{
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if(!res.ok){
        showSnackbar(data.message || "Credenciales incorrectas", "error");
        setIsDisabled(false);
        return;
      }
      showSnackbar("Inicio de sesión exitoso");
      setIsDisabled(true);
      saveCookie(data.token)
      setTimeout(() => {
        router.push("/admin/reports");
      }, 1200);
    }catch(err){
      showSnackbar(`Error de conexión con el servidor\nError: ${err}`, "error");
      setIsDisabled(false);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100">

      <header className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full flex justify-between items-center shadow-lg">
        <a href="/" className="text-3xl font-bold text-white tracking-tight">CloudBook</a>
        <span className="text-white font-semibold opacity-80">Acceso interno</span>
      </header>

      <main className="flex justify-center items-center px-4">

        <section className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col gap-6">

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Acceso de administrador
            </h2>
            <p className="text-slate-600 text-sm">
              Panel interno para desarrolladores de CloudBook
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600 font-medium">
                Nombre de usuario
              </label>
              <input
                type="text"
                required
                placeholder="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600 font-medium">
                Contraseña
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:grayscale disabled:hover:shadow-md disabled-hover:bg-blue-600 disabled:cursor-progress" disabled={isDisabled ? true : false}
            >
              Iniciar sesión
            </button>

          </form>

        </section>

      </main>

      <footer className="bg-slate-900 text-slate-200 text-center px-4 py-4 border-t border-slate-800">
        <p className="opacity-75">© 2025 - CloudBook Derechos reservados</p>
      </footer>

      {/* Snackbar */}
      {snackbar.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

          <div className={`px-6 py-3 rounded-lg shadow-lg text-white font-medium
            ${snackbar.type === "error" ? "bg-red-500" : "bg-green-600"}`}>

            {snackbar.message}

          </div>

        </div>
      )}

    </div>
  );
}