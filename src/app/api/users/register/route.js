import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password.controller";
import Supabase from "@/lib/supabase-client";
import { transporter } from "@/lib/nodemailer";
import { randomBytes } from "crypto";

const jwtsk = process.env.JWT_SK;
const GoogleEmail = process.env.ADMIN_API_GOOGLE_EMAIL;
const APIRoute = process.env.API_URL || "http://localhost:3000/";

export async function OPTIONS(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*', //TODO: Cambiar a domino cuando lo compre
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };

  return new Response(null, {
    status: 204,
    headers,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if(!email || !password) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 400 });

    const { data: exists } = await Supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .maybeSingle();

    if(exists) return NextResponse.json({ message: "Ya existe una cuenta con ese correo", error: "Email already exists." }, { status: 409 });

    const hashed = await hashPassword(password);

    const cancelToken = randomBytes(32).toString("hex");
    const now = Date.now();
    const cancelTokenExpires = new Date(now + 24 * 60 * 60 * 1000);

    const newUser = [{
      email,
      password: hashed,
      cancel_token: cancelToken,
      cancel_token_expires: cancelTokenExpires,
    }];

    const { data, error: createUserError } = await Supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

    if(createUserError) return NextResponse.json({ message: "Hubo un error al guardar tu usuario", error: createUserError.message }, { status: 500 });

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
                Tu correo se registró correctamente
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px;color:#333;font-size:15px;line-height:1.6;">
              Hola,
              Se ha registrado este correo en <b>CloudBook</b> correctamente.
              
              Si tú realizaste este registro, no necesitas hacer nada.
              <br /> <br />
              Si <b>no fuiste tú</b>, puedes cancelar el registro presionando el siguiente botón:
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:30px 0;">
              <a id="button" href="${APIRoute}security/cancel-signup/${cancelToken}"
                style="
                  background:#2563eb;
                  color:white;
                  padding:14px 28px;
                  text-decoration:none;
                  border-radius:6px;
                  font-weight:bold;
                  display:inline-block;
                ">
                Cancelar registro
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
    })
    .catch((err) => {
      return NextResponse.json({
        message: err.message || "Error al enviar el correo",
        error: err || "Nodemailer error"
      }, {
        status: 500
      });
    });

    const token = jwt.sign({ id: data.id }, jwtsk);

    return NextResponse.json({ message: "Registro hecho con exito", token });
  } catch (err) {
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}