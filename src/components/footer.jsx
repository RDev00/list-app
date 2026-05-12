import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Grid responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* Marca */}
          <div className="col-span-2 md:col-span-1 max-w-full">
            <h2 className="text-white text-base font-semibold">CloudBook</h2>
            <p className="text-sm mt-2 text-gray-400 leading-relaxed">
              Bloc de notas online con cifrado. Privacidad real para tus ideas.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h3 className="text-white font-medium mb-2 text-sm">Producto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/try" className="hover:text-white transition">
                  Probar
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-white transition">
                  Descargar
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-medium mb-2 text-sm">Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-md" className="hover:text-white transition">
                  Formato de notas
                </Link>
              </li>
              <li>
                <Link href="/tyc" className="hover:text-white transition">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-white font-medium mb-2 text-sm">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/bug-reports" className="hover:text-white transition">
                  Reportar bugs
                </Link>
              </li>
            </ul>
          </div>

          
          {/* Desarolladores */}
          <div>
            <h3 className="text-white font-medium mb-2 text-sm"> Desarrolladores </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/rdev00/list-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Repositorio
                </a>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition">
                  Documentación
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center text-xs sm:text-sm text-gray-500 py-4 px-4">
        © {new Date().getFullYear()} CloudBook — Privacidad primero.
      </div>
    </footer>
  );
}