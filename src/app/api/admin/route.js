import { NextResponse } from "next/server";
import Supabase from "@/lib/supabase-client";
import jwt from "jsonwebtoken";
import { verifyPasswords } from "@/lib/password.controller";

const jwtsk = process.env.JWT_SK;

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if(!username || !password) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 403 });

    const { data, error } = await Supabase
    .from("admins")
    .select("id, password, username")
    .eq("username", username)
    .single();

    if(error) return NextResponse.json({ message: "Hubo un error al querer iniciar sesión", error: error.message }, { status: 500 });

    const match = await verifyPasswords(password, data.password);
    if(!match) return NextResponse.json({ message: "Las contraseñas no coinciden" }, { status: 401 });

    const token = jwt.sign({ aid: data.id }, jwtsk, { expiresIn: "4h" });
    return NextResponse.json({ message: "Sesión iniciada correctamente", token, username: data.username});
  } catch(err) {
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 })
  }
}