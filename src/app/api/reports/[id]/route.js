import { NextResponse } from "next/server";
import Supabase from "@/lib/supabase-client";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

const jwtsk = process.env.JWT_SK;

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const headersList = await headers();
    const token = headersList.get("Authorization");

    if(!token) return NextResponse.json({ message: "Credenciales invalidas", error: "Unathorized" }, { status: 401 });
    if(!id) return NextResponse.json({ message: "No se ingresaron los datos necesarios", error: "Bad request" }, { status: 403 });

    const decoded = jwt.verify(token, jwtsk);
    if(!decoded || !decoded.aid) return NextResponse.json({ message: "Token invalido", error: "Wrong credentials" }, { status: 401 });

    const { error } = await Supabase
    .from("bug-reports")
    .delete()
    .eq("id", id);

    if(error) return NextResponse.json({ message: "Ha ocurrido un error al borrar el reporte", error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Reporte eliminado correctamente" });
  } catch(err) {
    console.log(err.message);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}