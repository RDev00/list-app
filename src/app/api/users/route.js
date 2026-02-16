import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { hashPassword, verifyPasswords } from "@/lib/password.controller";
import Supabase from "@/lib/supabase-client";
import { headers } from "next/headers";

const jwtsk = process.env.JWT_SK;

export async function GET() {
  try {
    const { data: users, error: getUsersError } = await Supabase
    .from("users")
    .select("email");

    if(getUsersError) return NextResponse.json({message: "Hubo un error al obtener los usuarios", error: getUsersError.message}, {status: 500});

    return NextResponse.json({ message: "Usuarios obtenidos", users });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}

export async function PUT(request){
  try {
    const body = await request.json();
    const { password, newPassword } = body;
    const headersList = await headers();
    const token = headersList.get("Authorization");

    if(!password) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 400 });
    if(!token) return NextResponse.json({ message: "Credenciales no ingresadas" }, { status: 401 });
    if(password === newPassword) return NextResponse.json({ message: "No puedes poner la misma contraseña que ya tenías antes" }, { status: 409 });

    const decoded = jwt.verify(token, jwtsk);
    if(!decoded || !decoded.id) return NextResponse.json({ message: "Credenciales invalidas" }, { status: 401 });

    const { data: user, error: getUserError } = await Supabase
    .from("users")
    .select("password")
    .eq("id", decoded.id)
    .single();

    if(getUserError) return NextResponse.json({ message: "Ha ocurrido un error al obtener los datos del usuario", error: getUserError.message }, { status: 500 });

    const match = await verifyPasswords(password, user.password);
    if(!match) return NextResponse.json({ message: "Las contraseñas no coinciden" }, { status: 401 });

    const hashed = await hashPassword(newPassword);

    const { error: updateUserError } = await Supabase
    .from("users")
    .update({ password: hashed })
    .eq("id", decoded.id);

    if(updateUserError) return NextResponse.json({ message: "Ha ocurrido un error al obtener los datos del usuario", error: updateUserError.message }, { status: 500 });

    return NextResponse.json({ message: "Contraseña actualizada con exito" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}

export async function DELETE(request){
  try {
    const body = await request.json();
    const { password, newPassword } = body;
    const headersList = await headers();
    const token = headersList.get("Authorization");

    if(!password) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 400 });
    if(!token) return NextResponse.json({ message: "Credenciales no ingresadas" }, { status: 401 });

    const decoded = jwt.verify(token, jwtsk);
    if(!decoded || !decoded.id) return NextResponse.json({ message: "Credenciales invalidas" }, { status: 401 });

    const { data: user, error: getUserError } = await Supabase
    .from("users")
    .select("password")
    .eq("id", decoded.id)
    .single();

    if(getUserError) return NextResponse.json({ message: "Ha ocurrido un error al obtener los datos del usuario", error: getUserError.message }, { status: 500 });

    const match = await verifyPasswords(password, user.password);
    if(!match) return NextResponse.json({ message: "Las contraseñas no coinciden" }, { status: 401 });
    
    const { error: deleteUserError } = await Supabase
    .from("users")
    .delete()
    .eq("id", decoded.id);

    if(deleteUserError) return NextResponse.json({ message: "Ha ocurrido un error al obtener los datos del usuario", error: deleteUserError.message }, { status: 500 });

    return NextResponse.json({ message: "Cuenta eliminada con exito" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}