"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MainContainer from "@/components/main-container";

export default function CancelSignUp(){
  const params = useParams();
  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ responseMessage, setResponseMessage ] = useState(false);
  const snackBarContainer = useRef(null)

  useEffect(() => {
    if(!params.token) return;
  }, []);

  const showSnackbar = ({message, type}) => {
    if(!snackBarContainer.current) return;
    const currentSnackBar = snackBarContainer.current;

    setResponseMessage(message);
    currentSnackBar.classList.remove("bg-green-500");
    currentSnackBar.classList.remove("bg-red-500");

    if(type === "success") {
      currentSnackBar.classList.add("bg-green-500");
    } else if(type === "error") {
      currentSnackBar.classList.add("bg-red-500");
    } else return;

    currentSnackBar.classList.remove("hidden");

    setTimeout(() => {
      currentSnackBar.classList.add("hidden");
      currentSnackBar.classList.remove("bg-green-500");
      currentSnackBar.classList.remove("bg-red-500");
      setResponseMessage("");
    }, 2000);
  }

  const deleteAccount = async() => {
    const deleteToken = params.token;
    setIsDisabled(true);
    try {
      const res = await fetch(`/api/users/${deleteToken}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      });

      const data = await res.json();

      if(res.status === 200) {
        showSnackbar({
          message: data.message,
          type: "success"
        });
      } else {
        showSnackbar({
          message: `${data.message}. Error: ${data.error}` || "Ha ocurrido un error al querer borrar la cuenta. Error: " + data.error,
          type: "error"
        });
      }
    } catch(err) {
        showSnackbar({
          message: "Ha ocurrido un error en el servidor. Error: " + err,
          type: "error"
        });
    }

    setTimeout(() => {
      return window.location.href="/";
    }, 2500);
  }
  return (
    <MainContainer>
      <section className="absolute top-1/2 left-1/2 -translate-1/2 bg-zinc-200 rounded-xl border-l-4 border-blue-600 shadow-lg/20 max-w-md">
        <h2 className="text-xl font-bold text-center px-6 py-4">
          ¿Estás seguro de querer borrar la cuenta enlazada al correo? <br />
          <span className="text-base text-gray-950/80 font-normal">Esta acción no es reversible</span>
        </h2>
        <div className="flex justify-center items-center">
          <a href="/" className="text-lg text-center w-1/2 py-2 hover:brightness-90 cursor-pointer rounded-bl-xl bg-zinc-300 text-red-600">
            No, regresar
          </a>
          <button className="text-lg text-center w-1/2 py-2 hover:brightness-120 cursor-pointer rounded-br-xl bg-green-500 text-zinc-100 disabled:grayscale disabled:hover:brightness-100 disabled:cursor-progress" disabled={isDisabled} onClick={() => {deleteAccount()}}>
            Si, estoy seguro
          </button>
        </div>
      </section>

      <section ref={snackBarContainer} className="fixed left-1/2 -translate-x-1/2 bottom-10 text-zinc-100 px-6 py-3 rounded-md shadow-lg/20 max-w-8/9 hidden">
        {responseMessage}
      </section>
    </MainContainer>
  )
}