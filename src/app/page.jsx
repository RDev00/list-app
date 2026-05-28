"use client";

//Next imports
import Image from "next/image";
import Link from "next/link";

//Prebuilt components
import Header from "@/components/header";
import Footer from "@/components/footer";
import MainContainer from "@/components/main-container";
import ContentComponent from "@/components/content-component";

//Lenis provider
import SmoothProvider from "@/lib/components/lenis";

export default function Main() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-linear-to-b from-slate-50 to-slate-100">
      <Header />
      
      <MainContainer>
        <SmoothProvider />
        <section
        className="w-full px-10 py-20 justify-center items-center flex flex-col animate-fade-in-up text-center">
          <h2 className="text-4xl max-w-2xl md:text-5xl font-bold text-slate-900 text-wrap mb-20">
            Construido para esas notas que requieren <span className="text-blue-600"> seguridad </span>
          </h2>

          <Image
          src="/wallpapers/dashboard.webp"
          alt="Dashboard example"
          height={1500}
          width={1500}
          loading="eager"
          className="w-full max-w-7xl mx-10 rounded-xl animate-fade-in-up border border-neutral-300 shadow-xl shadow-black/10" />
        </section>

        <div className="h-20"></div>

        <ContentComponent
        parentClasses="flex flex-col items-start justify-center gap-2 text-center md:text-start"
        image="/multi-devices.webp">
          <p
          className="font-bold text-2xl w-full">
            Construido en un lenguaje <br />
            Exportado a multiples dispositivos
          </p>
          <p
          className="opacity-80 w-full">
            Cloudbook usa una de las tecnologias de Google llamada Flutter, la cual tiene la meta de optimizar el tiempo de creación en aplicaciones multiplataforma sin tener que usar varios lenguajes, optimizando el tiempo de desarollo y el trabajo del programador.
          </p>
        </ContentComponent>

        <div className="h-20"></div>

        <ContentComponent
        parentClasses="flex flex-col items-start justify-center gap-2 text-center md:text-start"
        image="/encriptacion.jpg">
          <p
          className="font-bold text-2xl w-full">
            Datos seguros <br />
            Para esos secretos importantes
          </p>
          <p
          className="opacity-80 w-full">
            Usamos encriptado AES para guardar de manerae segura tus notas, usando cifrado END TO END, por lo que nosotros no podremos ver tus notas, asegurandolas hasta en un muy poco posible caso de filtración de datos.
          </p>
        </ContentComponent>

      </MainContainer>

      <Footer />
    </div>
  )
}