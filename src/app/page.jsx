"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MainContainer from "@/components/main-container";
import SecondaryContainer from "@/components/secondary-container";

export default function Main() {
  const [ promoteText, setPromoteText ] = useState("en linea.");
  const animationRef = useRef(null);
  const stateRef = useRef({ count: 0, position: 0 });
  const imageZoomedSection = useRef(null);

  useEffect(() => {
    const animationPromoteText = ["en línea.", "seguro."];

    const startAnimation = () => {
      stateRef.current = { count: 0, position: 0 };

      const animate = () => {
        const { count, position } = stateRef.current;
        
        if(position < animationPromoteText.length) {
          if(count < animationPromoteText[position].length) {
            setPromoteText(animationPromoteText[position].substring(0, count + 1));
            stateRef.current.count++;
            animationRef.current = setTimeout(animate, 150);
          } else {
            stateRef.current.position++;
            stateRef.current.count = 0;
            animationRef.current = setTimeout(animate, 1000);
          }
        } else {
          startAnimation();
        }
      };

      animate();
    };

    startAnimation();

    return () => {
      if(animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  const openRoadmap = () => {
    if(!imageZoomedSection.current) return;
    const currentSection = imageZoomedSection.current;
    currentSection.classList.remove("hidden");
  };

  const closeRoadmap = () => {
    if(!imageZoomedSection.current) return;
    const currentSection = imageZoomedSection.current;
    currentSection.classList.add("hidden");
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100">
      <Header isAdmin={false} />
      
      <MainContainer>
        <section className="w-full flex flex-col gap-6 justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-[60dvh] px-4 py-16 bg-[url(/wallpapers/wallpaper.jpg)] bg-cover bg-center bg-no-repeat">
          <div className="max-w-2xl text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Tu bloc de notas <span className="text-blue-600">{promoteText}</span>
            </h2>
            <h1 className="text-lg text-slate-600">La forma más simple y segura de organizar tus notas en la nube</h1>
          </div>
          <a href="try" type="button" className="bg-blue-600 text-white font-semibold rounded-lg px-8 py-3 text-base cursor-pointer hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
            ¡Probar ahora!
          </a>
        </section>

        <SecondaryContainer>
          <section className="w-full max-w-4xl py-16 px-6 flex flex-col items-center gap-8 bg-slate-50">
            <h2 className="text-4xl font-bold text-slate-900 text-center">
              Nuestro Roadmap
            </h2>
            <img src="cloudbook_roadmap.png" alt="CloudBook roadmap" onClick={openRoadmap} className="w-full max-w-6xl rounded-xl shadow-lg cursor-zoom-in hover:scale-[1.02] transition border-l-4 border-blue-500 rounded-xl" />
            <section ref={imageZoomedSection} className="fixed hidden inset-0 backdrop-brightness-50 backdrop-blur flex items-center justify-center">
              <button className="fixed right-4 top-4 w-10 h-10 rounded-full hover:bg-black/30" onClick={closeRoadmap}>
                <img src="/icons/close.svg" className="scale-50"/>
              </button>
              <img src="cloudbook_roadmap.png" className="block max-h-[95dvh] aspect-video rounded-xl shadow-lg"/>
            </section>
          </section>

          <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-blue-500 max-w-4xl hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">¿Por qué CloudBook es tu mejor opción?</h2>
            <p className="text-base text-slate-700 leading-relaxed"><b className="text-blue-600">CloudBook</b> es una aplicación de bloc de notas en línea diseñada para ofrecer almacenamiento seguro, organización eficiente y acceso multiplataforma a tus notas personales y profesionales. La plataforma utiliza encriptación avanzada para garantizar la protección y confidencialidad de los datos en todo momento.</p>
          </section>

          <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-green-500 max-w-4xl hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tus datos son seguros con nosotros</h2>
            <ul className="space-y-2 text-base text-slate-700">
              <li className="flex items-center gap-1"><span className="text-green-500 font-bold mr-3">✓</span><b>Encriptación</b> de datos sensibles</li>
              <li className="flex items-center gap-1"><span className="text-green-500 font-bold mr-3">✓</span><b>Protección</b> segura de contraseñas</li>
              <li className="flex items-center gap-1"><span className="text-green-500 font-bold mr-3">✓</span>Comunicación <b>cifrada</b> cliente-servidor</li>
              <li className="flex items-center gap-1"><span className="text-green-500 font-bold mr-3">✓</span>Gestión <b>segura</b> de sesiones</li>
              <li className="flex items-center gap-1"><span className="text-green-500 font-bold mr-3">✓</span>Almacenamiento <b>protegido</b> en la nube</li>
            </ul>
          </section>

          <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-purple-500 max-w-4xl hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Compatibilidad multiplataforma</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              <b className="text-purple-600">CloudBook</b> cuenta con soporte para dispositivos móviles gracias a su desarrollo en <b>Flutter</b>, permitiendo una experiencia fluida tanto en <b>Android</b> y <b>Windows</b>  desde <b>una sola</b> base de código.
            </p>
          </section>

          <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-orange-500 max-w-4xl hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Arquitectura</h2>
            <p className="text-base text-slate-700 mb-3">
              <b className="text-orange-600">CloudBook</b> utiliza el metodo <b>CRUD</b> (<b>Cr</b>eate, <b>R</b>ead, <b>U</b>pdate, <b>D</b>elete) para:
            </p>
            <ul className="space-y-1 text-base text-slate-700 pl-4">
              <li className="flex items-center"><span className="text-orange-500 mr-2">•</span>Gestionar tu cuenta</li>
              <li className="flex items-center"><span className="text-orange-500 mr-2">•</span>Control de tus notas</li>
            </ul>
          </section>

          <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-indigo-500 max-w-4xl hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Nuestro equipo de desarrollo</h2>
            <div className="space-y-3 text-base text-slate-700">
              <p><b className="text-indigo-600">Rafael:</b> Programador backend y web, encargado del diseño del sistema, arquitectura general y gestión de requests. Responsable de la estructura del servidor y la integración de los servicios.</p>
              <p><b className="text-indigo-600">Isaac:</b> Programador enfocado en funciones básicas, desarrollo del planteamiento del problema, implementación de soluciones y definición de metas del proyecto.</p>
            </div>
          </section>        

          <section className="px-6 py-6 w-full bg-white rounded-xl shadow-md border-l-4 border-red-500 max-w-4xl hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Nuestro objetivo</h2>
            <p className="text-base text-slate-700 leading-relaxed">Brindar una herramienta digital segura, intuitiva y accesible desde cualquier dispositivo, que permita a los usuarios almacenar su información con confianza y facilidad.</p>
          </section>
        </SecondaryContainer>
      </MainContainer>

      <Footer />
    </div>
  )
}