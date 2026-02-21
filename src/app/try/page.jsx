"use client";

import { useRef } from "react";

export default function TryPage() {
  const editorRef = useRef(null);
  const header = useRef(null);

  const disableHeader = () => {
    header.current.classList.add("hidden");
  };

  const applyFormat = (type) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    console.log("Modo seleccionado", type)
    const range = selection.getRangeAt(0);

    let element;

    switch (type) {
      case "bold":
        element = document.createElement("b");
        break;
      case "title":
        element = document.createElement("span");
        element.className = "text-xl font-bold";
        break;
      case "subtitle":
        element = document.createElement("span");
        element.className = "text-lg font-semibold";
        break;
      default:
        return;
    }

    const selectedText = range.toString();

    if (!selectedText) return;

    element.textContent = selectedText;

    range.deleteContents();
    range.insertNode(element);

    // 🔥 mover cursor después del elemento insertado
    range.setStartAfter(element);
    range.setEndAfter(element);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const Descargar = (docType) => {
    const editor = editorRef.current;
    if (!editor) return;

    let content = editor.innerHTML;
    let blob;

    if (docType === "txt") {
      blob = new Blob([editor.innerText], { type: "text/plain" });
    }

    if (docType === "md") {
      let mdContent = editor.innerHTML
        .replace(/<b>(.*?)<\/b>/g, "**$1**")
        .replace(/<span class="text-xl font-bold">(.*?)<\/span>/g, "# $1")
        .replace(/<span class="text-lg font-semibold">(.*?)<\/span>/g, "## $1")
        .replace(/<br>/g, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "");

      blob = new Blob([mdContent], { type: "text/markdown" });
    }

    if (docType === "html") {
      let htmlContent = editor.innerHTML
        .replace(
          /class="text-xl font-bold"/g,
          'style="font-size:24px;font-weight:bold;"'
        )
        .replace(
          /class="text-lg font-semibold"/g,
          'style="font-size:18px;font-weight:600;"'
        );

      blob = new Blob([htmlContent], { type: "text/html" });
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `documento.${docType}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="px-6 py-4 bg-blue-400 w-full flex justify-between items-center shadow-lg sticky top-0" ref={header}>
        <h1 className="text-xl text-white">
          <a href="/download" className="text-blue-600 hover:text-purple-600 underline"> Descarga </a>
          nuestra app y empieza a guardar tus notas de manera segura
        </h1>
        <button className="text-xl rounded-full px-3 hover:backdrop-brightness-90 cursor-pointer flex justify-center items-center aspect-square" onClick={() => {disableHeader()}}>
          <p className="relative top-[-3] font-bold text-white">x</p>
        </button>
      </header>

      <main className="flex flex-col min-h-dvh">

        <div className="bg-white shadow-md p-3 flex gap-3 flex-wrap border-b">
          <button onClick={() => applyFormat("bold")} className="rounded-md px-2 py-1 hover:backdrop-brightness-90 cursor-pointer">
            Negrita
          </button>
          <button onClick={() => applyFormat("title")} className="rounded-md px-2 py-1 hover:backdrop-brightness-90 cursor-pointer">
            Título
          </button>
          <button onClick={() => applyFormat("subtitle")} className="rounded-md px-2 py-1 hover:backdrop-brightness-90 cursor-pointer">
            Subtítulo
          </button>

          <div className="border-l mx-2"></div>

          <button onClick={() => Descargar("md")} className="rounded-md px-2 py-1 hover:brightness-90 cursor-pointer bg-green-200">
            Descargar .md
          </button>
          <button onClick={() => Descargar("txt")} className="rounded-md px-2 py-1 hover:brightness-90 cursor-pointer bg-blue-200">
            Descargar .txt
          </button>
          <button onClick={() => Descargar("html")} className="rounded-md px-2 py-1 hover:brightness-90 cursor-pointer bg-purple-200">
            Descargar .html
          </button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          className="flex-1 p-6 outline-none bg-white"
          suppressContentEditableWarning={true}
        ></div>
      </main>

      <footer className="bg-slate-900 text-slate-200 text-center px-4 py-4 border-t border-slate-800">
        <p className="opacity-75">
          © 2025 - CloudBook Derechos reservados
        </p>
      </footer>
    </div>
  );
}