import { NextResponse } from "next/server";
import Supabase from "@/lib/supabase-client";

export async function GET(request) {
  try {
    const { data: isDBActive, error: DBError } = Supabase
    .from("users")
    .select("id");

    if(DBError) return NextResponse.json({ message: "Hubo un error al quererse contectar a la base de datos", error: DBError.message }, { status: 500 });

    return NextResponse.json({ message: "La base de datos y servidor están funcionando de manera correcta" });
  } catch(err) {
    return NextResponse.json({ message: "El servidor no esta funcionando bien actualmente", error: err.message }, { status: 500 });
  }
}