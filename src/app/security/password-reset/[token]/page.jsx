"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import MainContainer from "@/components/main-container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SecondaryContainer from "@/components/secondary-container";

export default function PasswordReset(){

  const params = useParams();

  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ responseMessage, setResponseMessage ] = useState("");

  const snackBarContainer = useRef(null);

  const showSnackbar = ({ message, type }) => {
    if(!snackBarContainer.current) return;

    const currentSnackBar = snackBarContainer.current;

    setResponseMessage(message);

    currentSnackBar.classList.remove("bg-green-500");
    currentSnackBar.classList.remove("bg-red-500");

    if(type === "success"){
      currentSnackBar.classList.add("bg-green-500");
    } else if(type === "error"){
      currentSnackBar.classList.add("bg-red-500");
    } else return;

    currentSnackBar.classList.remove("hidden");

    setTimeout(() => {
      currentSnackBar.classList.add("hidden");
      currentSnackBar.classList.remove("bg-green-500");
      currentSnackBar.classList.remove("bg-red-500");
      setResponseMessage("");
    }, 2000);
  };

  const resetPassword = async () => {
    if(password !== confirmPassword){
      showSnackbar({
        message: "Las contraseñas no coinciden.",
        type: "error"
      });
      return;
    }

    if(password.length < 6){
      showSnackbar({
        message: "La contraseña debe tener al menos 6 caracteres.",
        type: "error"
      });
      return;
    }
    const token = params.token;

    setIsDisabled(true);

    try {
      const res = await fetch(`/api/users/password-reset`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          newPassword: password
        })
      });

      const data = await res.json();

      if(res.status === 200){
        showSnackbar({
          message: data.message || "Contraseña actualizada correctamente.",
          type: "success"
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2500);
      } else {
        showSnackbar({
          message: `${data.message}. Error: ${data.error}` || "No se pudo actualizar la contraseña.",
          type: "error"
        });
      }

      return setTimeout(() => {
        window.location.href = "/"
      }, 2500)

    } catch(err){
      showSnackbar({
        message: "Error del servidor: " + err,
        type: "error"
      });
      
      return setTimeout(() => {
        window.location.href = "/"
      }, 2500);
    }

      
  };

  return (
    <MainContainer>
      <Header />

      <SecondaryContainer>
        <section className="bg-zinc-200 rounded-xl border-l-4 border-blue-600 shadow-lg/20 max-w-md w-full">

          <h2 className="text-xl font-bold text-center px-6 py-4">
            Restablecer contraseña
            <br />
            <span className="text-base text-gray-950/80 font-normal">
              Ingresa tu nueva contraseña
            </span>
          </h2>

          <div className="flex flex-col gap-4 px-6 pb-6">

            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"/>

            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"/>

            <button onClick={resetPassword} disabled={isDisabled} className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-blue-700 transitio cursor-pointer disabled:grayscale disabled:cursor-progress">
              Cambiar contraseña
            </button>

            <a href="/" className="text-center text-red-600 hover:underline" >
              Cancelar
            </a>
          </div>
        </section>

        <section ref={snackBarContainer} className="fixed left-1/2 -translate-x-1/2 bottom-10 text-zinc-100 px-6 py-3 rounded-md shadow-lg/20 max-w-8/9 hidden">
          {responseMessage}
        </section>
      </SecondaryContainer>

      <Footer/>
    </MainContainer>
  );
}