"use client";

//Next imports
import Image from "next/image";
import Link from "next/link";

//Prebuilt components
import Header from "@/components/header";
import Footer from "@/components/footer";
import MainContainer from "@/components/main-container";

//Card comp
function FeaturesCard(props){
  return (
    <section
    className="flex flex-col gap-1 justify-center items-start w-full max-w-lg bg-sky-600 text-zinc-50 py-3 rounded-lg px-5 cursor-default">
      <p
      className="text-lg font-medium tracking-wide"> { props.title } </p>
      <p> { props.content } </p>
    </section>
  )
}

export default function Main() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-linear-to-b from-slate-50 to-slate-100">
      <Header />
      
      <MainContainer>
        <section
        className="w-full px-10 py-20 justify-center items-center flex flex-col animate-fade-in-up text-center">
          <h2 className="text-4xl max-w-2xl md:text-5xl font-bold text-slate-900 text-wrap">
            Construido para esas notas que requieren <span className="text-blue-600"> seguridad </span>
          </h2>

          <div
          className="w-full py-10 gap-5 flex justify-center items-center">
            <Link
            href="/download"
            className="hover:bg-neutral-300 w-40 text-gray-950 p-2 rounded-md duration-400 animate-fade-in-right">
              Descargar
            </Link>
            <Link
            href="/try"
            className="bg-blue-600 w-40 text-zinc-50 p-2 rounded-md duration-400 hover:bg-blue-800 animate-fade-in-left">
            Probar
            </Link>
          </div>

          <Image
          src="/wallpapers/dashboard.webp"
          alt="Dashboard example"
          height={1500}
          width={1500}
          loading="eager"
          className="w-full max-w-7xl mx-10 rounded-xl animate-fade-in-up border border-neutral-300 shadow-xl shadow-black/10" />
        </section>

        <section
        className="w-full flex flex-col gap-5 justify-center items-center p-10 timeline-view-y animate-range-[entry_0%_cover_30%] animate-zoom-in">
          <span
          className="p-2 w-50 rounded-full text-center bg-sky-600 text-gray-100 animate-fade-in">
            ¿Porqué Cloudbook?
          </span>

          <div
          className="w-full flex flex-col md:flex-row gap-10 justify-center items-center md:items-start p-10 animate-fade-in">
            <FeaturesCard
            title="Optimización"
            content="Nuestro código aparte de ser OpenSource, está optimizado para ser lo que tú buscas, algo que sea solo el block de notas" />
            <FeaturesCard
            title="Multiplataforma"
            content="Al estar desarollado en flutter, tienes acceso a tus notas desde dispositivos Windows o Android" />
            <FeaturesCard
            title="Encriptado"
            content="Cloudbook usa encriptado AES y end-to-end, por lo que ni nosotros podremos ver que escribes" />
          </div>
        </section>

      </MainContainer>

      <Footer />
    </div>
  )
}