"use client";

export default function Download() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100">
      
      {/* Header */}
      <header className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold text-white tracking-tight">CloudBook</h1>
        <a href="/" className="bg-white text-blue-600 font-semibold rounded-lg px-6 py-2 hover:shadow-lg hover:brightness-95 transition-all">
          Inicio
        </a>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center px-4 py-12 gap-10">

        {/* Hero */}
        <section className="text-center max-w-3xl space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Descarga <span className="text-blue-600">CloudBook</span>
          </h2>
          <p className="text-lg text-slate-600">
            Disponible para Windows y Android. Sincroniza tus notas de forma segura y accede desde cualquier lugar.
          </p>
        </section>

        {/* Windows Section */}
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border-l-4 border-blue-600 p-8 hover:shadow-xl transition-all">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-xl">
              <h3 className="text-3xl font-bold text-slate-900">
                Versión para Windows
              </h3>
              <p className="text-slate-600">
                Descarga CloudBook para Windows y disfruta de una experiencia completa 
                de escritorio con sincronización en tiempo real, almacenamiento seguro 
                y acceso rápido a todas tus notas.
              </p>

              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center"><span className="text-blue-600 mr-2">✓</span>Instalador ligero y rápido</li>
                <li className="flex items-center"><span className="text-blue-600 mr-2">✓</span>Sincronización automática</li>
                <li className="flex items-center"><span className="text-blue-600 mr-2">✓</span>Compatible con Windows 10 y 11</li>
              </ul>

              <a href="/files/CloudBook-Setup.exe" className="inline-block mt-4 bg-blue-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
                Descargar para Windows
              </a>
            </div>

            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-2xl flex items-center justify-center text-blue-600 text-6xl font-bold shadow-inner">
                <img src="/logos/windows.png" alt="Logo made by Smashicons" className="aspect-square block h-40 p-3"/>
              </div>
            </div>

          </div>
        </section>

        {/* Android Section */}
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border-l-4 border-green-600 p-8 hover:shadow-xl transition-all">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-xl">
              <h3 className="text-3xl font-bold text-slate-900">
                Versión para Android
              </h3>
              <p className="text-slate-600">
                Lleva tus notas contigo. Con la app de CloudBook para Android 
                podrás crear, editar y sincronizar tus notas desde cualquier lugar 
                con total seguridad.
              </p>

              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span>Interfaz optimizada para móviles</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span>Acceso seguro con autenticación</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span>Compatible con Android 8.0 o superior</li>
              </ul>

              <a href="/files/CloudBook-Android.apk" className="inline-block mt-4 bg-green-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-green-700 shadow-md hover:shadow-lg transition-all">
                Descargar APK
              </a>
            </div>

            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-2xl flex items-center justify-center text-green-600 text-6xl font-bold shadow-inner">
                <img src="/logos/android.png" alt="Logo made by Freepick" className="aspect-square block h-40 p-3"/>
              </div>
            </div>

          </div>
        </section>

        {/* Security Note */}
        <section className="w-full max-w-4xl bg-slate-900 text-slate-200 rounded-xl p-6 shadow-lg">
          <h4 className="text-xl font-semibold mb-2">Descarga segura</h4>
          <p className="opacity-80 text-sm">
            Todos los instaladores oficiales de CloudBook están libres de malware y firmados digitalmente.
            Recomendamos descargar siempre desde el sitio oficial para garantizar la seguridad y autenticidad del software.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 text-center px-4 py-4 border-t border-slate-800">
        <p className="opacity-75">© 2025 - CloudBook Derechos reservados</p>
      </footer>
    </div>
  );
}