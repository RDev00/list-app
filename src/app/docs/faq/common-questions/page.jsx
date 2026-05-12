"use client";

import Link from "next/link";
import { useState } from "react";

export default function CommonQuestions() {
  const [openFAQs, setOpenFAQs] = useState({});

  const faqs = [
    {
      id: 1,
      category: "Cuenta",
      question: "¿Cómo creo una cuenta en CloudBook?",
      answer: "Puedes crear una cuenta visitando https://cloudbook.ravexcode.com, haciendo clic en 'Registrarse' e ingresando tu correo electrónico, nombre y contraseña. Verifica tu correo electrónico para activar tu cuenta."
    },
    {
      id: 2,
      category: "Cuenta",
      question: "¿Olvidé mi contraseña. ¿Cómo la restablezco?",
      answer: "En la pantalla de login, haz clic en '¿Olvidaste tu contraseña?'. Ingresa tu correo y recibirás un enlace para restablecerla. Sigue las instrucciones en el correo para crear una nueva contraseña."
    },
    {
      id: 3,
      category: "Cuenta",
      question: "¿Puedo cambiar mi correo electrónico?",
      answer: "Sí. Ve a Configuración → Perfil y edita tu dirección de correo. Tendrás que verificar el nuevo correo antes de que se confirme el cambio."
    },
    {
      id: 4,
      category: "Notas",
      question: "¿Cuántas notas puedo crear?",
      answer: "No hay límite de cantidad de notas. El límite es de almacenamiento (5GB gratuito, 100GB Pro, 1TB Business)."
    },
    {
      id: 5,
      category: "Notas",
      question: "¿Mis notas se sincronizan automáticamente?",
      answer: "Sí, CloudBook sincroniza automáticamente todos los cambios en tiempo real entre tus dispositivos cuando hay conexión a Internet."
    },
    {
      id: 6,
      category: "Notas",
      question: "¿Puedo recuperar notas eliminadas?",
      answer: "Sí. Las notas eliminadas van a la papelera durante 30 días. Ve a Papelera y restaura las notas que desees. Después de 30 días se eliminan permanentemente."
    },
    {
      id: 7,
      category: "Almacenamiento",
      question: "¿Cuánto almacenamiento tengo disponible?",
      answer: "Depende de tu plan: Gratuito (5GB), Pro (100GB) o Business (1TB). Puedes ver tu uso en Configuración → Almacenamiento."
    },
    {
      id: 8,
      category: "Almacenamiento",
      question: "¿Qué sucede si excedo mi límite de almacenamiento?",
      answer: "Si alcanzas el límite, no podrás crear nuevas notas. Debes eliminar contenido o actualizar a un plan con mayor almacenamiento."
    },
    {
      id: 9,
      category: "Compartir",
      question: "¿Puedo compartir una nota sin que la puedan editar?",
      answer: "Sí. Al compartir, puedes elegir el nivel de permiso: Ver (solo lectura), Comentar o Editar. Selecciona 'Ver' para solo lectura."
    },
    {
      id: 10,
      category: "Compartir",
      question: "¿Puedo dejar de compartir una nota?",
      answer: "Sí. Abre la nota, haz clic en 'Compartir' y elimina a los usuarios de la lista. También puedes revocar acceso a enlaces públicos."
    },
    {
      id: 11,
      category: "Seguridad",
      question: "¿Mis datos están encriptados?",
      answer: "Sí, completamente. Tus notas se encriptan con AES-256 en tu dispositivo antes de enviarse. CloudBook nunca puede ver tu contenido desencriptado."
    },
    {
      id: 12,
      category: "Seguridad",
      question: "¿Qué es la autenticación de dos factores?",
      answer: "2FA añade una capa de seguridad extra. Después de ingresar tu contraseña, debes ingresar un código de una app (como Google Authenticator) para completar el login."
    },
    {
      id: 13,
      category: "Planes",
      question: "¿Puedo cambiar de plan en cualquier momento?",
      answer: "Sí. Puedes actualizar o degradar tu plan en cualquier momento desde Configuración → Plan. Los cambios se efectúan inmediatamente."
    },
    {
      id: 14,
      category: "Planes",
      question: "¿Hay un período de prueba gratuito?",
      answer: "El plan gratuito ofrece 5GB de almacenamiento de forma permanente. Puedes probar Pro pagando solo $4.99/mes."
    },
    {
      id: 15,
      category: "Soporte",
      question: "¿Cómo contacto al soporte?",
      answer: "Puedes contactarnos a través de: Email (support@cloudbook.ravexcode.com), Chat en vivo en el sitio web, o reportando un problema directamente desde la app."
    }
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const toggleFAQ = (id) => {
    setOpenFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Preguntas Frecuentes</h1>
        <p className="text-lg text-slate-600">
          Respuestas a las preguntas más comunes sobre CloudBook.
        </p>
      </section>

      {/* FAQs by Category */}
      <div className="space-y-8">
        {categories.map(category => (
          <section key={category} className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">{category}</h2>
            
            <div className="space-y-3">
              {faqs.filter(faq => faq.category === category).map(faq => (
                <div
                  key={faq.id}
                  className="border border-slate-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors text-left"
                  >
                    <p className="font-semibold text-slate-900">{faq.question}</p>
                    <span className="text-xl text-slate-600">
                      {openFAQs[faq.id] ? "−" : "+"}
                    </span>
                  </button>
                  
                  {openFAQs[faq.id] && (
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                      <p className="text-slate-700 text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Still Have Questions */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">¿Aún tienes preguntas?</h3>
        <p className="text-slate-600 mb-4">
          Si no encuentras la respuesta que buscas, no dudes en contactarnos.
        </p>
        <div className="space-x-4 space-y-2">
          <Link
            href="/docs/faq/troubleshooting"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Solución de Problemas
          </Link>
          <Link
            href="/bug-reports"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Contactar Soporte
          </Link>
        </div>
      </section>
    </div>
  );
}
