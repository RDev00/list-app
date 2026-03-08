export default function TermsAndConditions(){ 
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100">
      
      <header className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full flex justify-between items-center shadow-lg">
        <a href="/" className="text-3xl font-bold text-white tracking-tight">CloudBook</a>
        <a href="/download" className="bg-white text-blue-600 font-semibold rounded-lg px-6 py-2 hover:shadow-lg hover:brightness-95 transition-all cursor-pointer">
          Descargar
        </a>
      </header>

      <main className="flex flex-col justify-start items-center gap-8 pb-10 px-4 py-8">

        <h2 className="text-4xl text-center text-slate-900 font-bold">
          Términos y Condiciones
        </h2>
        <p className="text-sm text-slate-500">
          Última actualización: Marzo 2026
        </p>

        <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-blue-500 max-w-4xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">1. Aceptación de los términos</h3>
          <p className="text-slate-700 leading-relaxed">
            Al utilizar <b className="text-blue-600">CloudBook</b>, el usuario acepta cumplir con los presentes 
            términos y condiciones. Si el usuario no está de acuerdo con alguna parte de estos términos, 
            deberá abstenerse de utilizar el servicio.
          </p>
        </section>

        <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-green-500 max-w-4xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">2. Uso del servicio</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            <b className="text-green-600">CloudBook</b> proporciona una plataforma digital para almacenar 
            y organizar notas personales en la nube.
          </p>

          <ul className="space-y-2 text-slate-700">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">•</span>
              El usuario es responsable del contenido que almacena.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">•</span>
              Está prohibido utilizar el servicio para actividades ilegales o fraudulentas.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">•</span>
              El usuario se compromete a no intentar vulnerar la seguridad del sistema.
            </li>
          </ul>
        </section>

        <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-purple-500 max-w-4xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">3. Privacidad y protección de datos</h3>
          <p className="text-slate-700 leading-relaxed">
            CloudBook implementa medidas de seguridad diseñadas para proteger la información del usuario, 
            incluyendo encriptación de datos y comunicación cifrada entre cliente y servidor. 
            Sin embargo, el usuario reconoce que ningún sistema digital puede garantizar seguridad absoluta.
          </p>
        </section>

        <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-orange-500 max-w-4xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">4. Responsabilidad del usuario</h3>
          <p className="text-slate-700 leading-relaxed">
            El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso. 
            Cualquier actividad realizada desde su cuenta será considerada responsabilidad del usuario.
          </p>
        </section>

        <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-indigo-500 max-w-4xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">5. Disponibilidad del servicio</h3>
          <p className="text-slate-700 leading-relaxed">
            CloudBook se esfuerza por mantener el servicio disponible y funcional. No obstante, 
            pueden presentarse interrupciones temporales por mantenimiento, actualizaciones o 
            circunstancias técnicas fuera del control del equipo de desarrollo.
          </p>
        </section>

        <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-red-500 max-w-4xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">6. Modificaciones</h3>
          <p className="text-slate-700 leading-relaxed">
            El equipo de desarrollo de CloudBook se reserva el derecho de modificar estos términos 
            y condiciones en cualquier momento. Las modificaciones entrarán en vigor una vez 
            publicadas en esta página.
          </p>
        </section>

        <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-slate-500 max-w-4xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">7. Contacto</h3>
          <p className="text-slate-700 leading-relaxed">
            Si tienes preguntas sobre estos términos y condiciones, puedes contactar al equipo de desarrollo a través de el siguiente correo: <span className="font-semibold">cloudbook@gmail.com</span>.
          </p>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-200 text-center px-4 py-4 border-t border-slate-800">
        <p className="opacity-75">© 2026 - CloudBook Derechos reservados</p>
      </footer>

    </div>
  )
}