import { NextResponse } from "next/server";
import Supabase from "@/lib/supabase-client";
import { transporter } from "@/lib/nodemailer";
import { randomBytes } from "crypto";
import { hashPassword } from "@/lib/password.controller";

const GoogleEmail = process.env.ADMIN_API_GOOGLE_EMAIL;
const APIRoute = process.env.API_URL || "http://localhost:3000/";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if(!email) return NextResponse.json({ message: "No se ingresaron los datos requeridos", error: "Bad request" }, { status: 403 });

    const recoveryToken = randomBytes(32).toString("hex");
    const now = Date.now();
    const recoveryTokenExpires = new Date(now + 2 * 60 * 60 * 1000);

    const { data, error } = await Supabase
    .from("users")
    .update({ recovery_token: recoveryToken,
      recovery_token_expires: recoveryTokenExpires })
    .eq("email", email)
    .select()
    .maybeSingle();

    if(!data) return NextResponse.json({ message: "El correo que ingresaste no está registrado", error: "Not found" }, { status: 404 });

    if(error) return NextResponse.json({ message: "Hubo un error al querer guradar tus tokens de recuperación", error: error.message }, { status: 500 });

    await transporter.sendMail({
      from: `"CloudBook" ${GoogleEmail}`,
      to: email,
      subject: "Bienvenido a CloudBook",
      html: `<div style="background:#f4f6fb;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
        <style>
            a{ color: gray; }
            a:hover {
                color: blue;
            }
            #button:hover {
                filter: brightness(0.8);
            }
        </style>
        <table align="center" width="600" style="background:#ffffff;border-radius:10px;padding:40px;">
          
          <tr>
            <td align="center">
              <h1 style="color:#2563eb;margin-bottom:10px;">CloudBook</h1>
              <p style="color:#555;font-size:16px;margin-top:0;">
                Cambio de contraseña
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px;color:#333;font-size:15px;line-height:1.6;">
              Hola, nos has indicado que olvidaste la contraseña e ingresaste este correo, sino fuiste tú ignoralo, se desactivará el token dentro de 1 hora. De lo contrario ingresa al enlace que te dejaremos debajo para cambiar tu contraseña.
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:30px 0;">
              <a id="button" href="${APIRoute}security/password-reset/${recoveryToken}"
                style="
                  background:#2563eb;
                  color:white;
                  padding:14px 28px;
                  text-decoration:none;
                  border-radius:6px;
                  font-weight:bold;
                  display:inline-block;
                ">
                Cambiar contraseña
              </a>
            </td>
          </tr>

          <tr>
            <td style="font-size:13px;color:#888;text-align:center;border-top:1px solid #eee;padding-top:20px;">
              CloudBook Security System<br>
              <a href=${APIRoute}> Nuestro sitio oficial </a>
            </td>
          </tr>

        </table>

      </div>`
    });

    return NextResponse.json({ message: "Listo para cambiar tu contraseña, mira dentro del correo que tienes registrado en tu cuenta" });
  } catch(err) {
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if(!token || !newPassword) return NextResponse.json({ message: "No se ingresaron los datos requeridos", error: "Bad request" }, { error: 403 });

    const { data, error: getUserDataError } = await Supabase
    .from("users")
    .select("id, recovery_token_expires")
    .eq("recovery_token", token)
    .maybeSingle();

    if(!data) return NextResponse.json({ message : "El usuario que buscabas no existe", error: "Not found" }, { status: 404 });

    if(getUserDataError) return NextResponse.json({ message: "Hubo un error al obtener los datos de la cuenta", error: getUserDataError.message }, { status: 500 });

    const now = Date.now();
    if(data.recovery_token_expires <= now) return NextResponse.json({ message: "El token está vencido", error: "Timeout" }, { status: 408 });

    const hashed = await hashPassword(newPassword);

    const { error: updatePasswordError } = await Supabase
    .from("users")
    .update({ password: hashed })
    .eq("id", data.id);

    if(updatePasswordError) return NextResponse.json({ message: "Hubo un error a querer cambiar la contraseña", error: updatePasswordError.message }, { status: 500 });

    return NextResponse.json({ message: "Tus contraseñas se actualizaron correctamente, intenta reingresar de nuevo" });
  } catch(err) {
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}