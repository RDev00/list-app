import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password.controller";
import Supabase from "@/lib/supabase-client";

const jwtsk = process.env.JWT_SK;

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
    .single();

    if(exists) return NextResponse.json({ message: "Ya existe una cuenta con ese correo" }, { status: 409 });

    const hashed = await hashPassword(password);

    const newUser = [{
      email,
      password: hashed
    }];

    const { data, error: createUserError } = await Supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

    if(createUserError) return NextResponse.json({ message: "Hubo un error al guardar tu usuario", error: createUserError.message }, { status: 500 });

    const token = jwt.sign({ id: data.id }, jwtsk);

    return NextResponse.json({ message: "Registro hecho con exito", token });
  } catch (err) {
    console.error(error);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}