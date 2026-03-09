export default function Header(props){
  return props.isAdmin ? (
    <header className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full flex justify-between items-center shadow-lg">
      <a href="/" className="text-3xl font-bold text-white tracking-tight">CloudBook</a>
      <span className="text-white font-semibold opacity-80">Acceso interno</span>
    </header>
  ) : (
    <header className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full flex justify-between items-center shadow-lg">
      <a href="/" className="text-3xl font-bold text-white tracking-tight">CloudBook</a>
      <a href="/download" className="bg-white text-blue-600 font-semibold rounded-lg px-6 py-2 hover:shadow-lg hover:brightness-95 transition-all cursor-pointer">
        Descargar
      </a>
    </header>
  )
}