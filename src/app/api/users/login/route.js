import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { verifyPasswords } from "@/lib/password.controller";
import Supabase from "@/lib/supabase-client";

const jwtsk = process.env.JWT_SK;

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if(!email || !password) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 400 });

    const { data: user, error: getUserError } = await Supabase
    .from("users")
    .select("id, password")
    .eq("email", email)
    .single();

    if(getUserError) return NextResponse.json({ message: "Ha ocurrido un error al intentar obtener los datos de usuario", error: getUserError.message }, { status: 500 });

    const match = await verifyPasswords(password, user.password);
    if(!match) return NextResponse.json({ message: "Las contraseñas no coinciden" }, { status: 401 });

    const token = jwt.sign({ id: user.id }, jwtsk);

    return NextResponse.json({ message: "Inicio de sesión hecho con éxito", token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}