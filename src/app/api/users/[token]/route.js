import Supabase from "@/lib/supabase-client";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { token } = await params; //<- DeleteToken, no JWTToken *

    if(!token) return NextResponse.json({ message: "No se ingresaron los datos requeridos", error: "Bad Request" }, { status: 403 });

    const { data: user, error: getUserDataError } = await Supabase
    .from("users")
    .select("id, cancel_token_expires")
    .eq("cancel_token", token)
    .maybeSingle();
    
    if(!user) return NextResponse.json({ message: "El usuario que buscabas ya no existe", error: "Not found" }, { status: 404 })

    if(getUserDataError) return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: getUserDataError.message }, { status: 500 });

    const now = Date.now();
    const expires = new Date(user.cancel_token_expires).getTime();
    if(expires <= now) return NextResponse.json({ message: "El token está vencido", error: "Timeout" }, { status: 408 });

    const { error: deleteUserError } = await Supabase
    .from("users")
    .delete()
    .eq("cancel_token", token);

    if(deleteUserError) return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: deleteUserError.message }, { status: 500 });

    return NextResponse.json({ message: "Cuenta de usuario borrada con éxito" });
  } catch(err) {
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}