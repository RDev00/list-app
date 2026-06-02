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
          className="w-screen sm:w-full px-6 md:px-10 py-20 flex flex-col items-center text-center min-h-[95dvh] animate-fade-in-up overflow-hidden"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 max-w-2xl mb-12">
            Construido para esas notas que requieren
            <span className="text-blue-600"> seguridad </span>
          </h2>

          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-225 max-w-7xl mx-auto">
              <Image
                src="/wallpapers/dashboard.webp"
                alt="Dashboard example"
                width={1500}
                height={1500}
                priority
                className="w-full rounded-xl border border-neutral-300"
              />
            </div>
          </div>
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

        <section
        className="flex flex-col items-center gap-4 w-full px-4 mb-10 mt-20 timeline-view-y animate-zoom-in animate-range-[entry_0%_cover_20%]">
          <p
          className="text-center font-semibold tracking-wide text-5xl">
            OpenSource desde el día uno
          </p>
          <p
          className="text-center max-w-200">
            Nuestro servicio es OpenSource, por lo que puedes explorar dentro de el código fuente de nuestra aplicación en caso de que quieras conocer más sobre nuestros procesos y nuestros metodos de encriptación y autenticación
          </p>

          <Link
          href="https://github.com/RDev00/list-app"
          className="w-50 rounded-md bg-blue-600 duration-300 hover:bg-blue-800 text-zinc-50 py-2 text-center">
            Ver código fuente
          </Link>
        </section>

      </MainContainer>

      <Footer />
    </div>
  )
}