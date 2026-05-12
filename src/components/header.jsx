export default function Header(props){
  return props.isAdmin ? (
    <header className="px-6 py-4 bg-linear-to-r from-blue-600 to-blue-700 w-full flex justify-between items-center shadow-lg animate-fade-in-down">
      <a href="/" className="text-3xl font-bold text-white tracking-wider">CloudBook</a>
      <span className="text-white font-semibold opacity-80">Acceso interno</span>
    </header>
  ) : (
    <header className="px-6 py-4 bg-linear-to-r from-blue-600 to-blue-700 w-full flex justify-between items-center shadow-lg animate-fade-in-down">
      <a href="/" className="text-3xl font-bold text-white tracking-tight">CloudBook</a>
      <a href="/download" className="bg-white text-blue-600 font-semibold text-sm rounded-lg py-2 px-4 hover:shadow-lg hover:brightness-95 transition-all cursor-pointer">
        Descargar
      </a>
    </header>
  )
}