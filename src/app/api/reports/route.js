import { NextResponse } from "next/server";
import Supabase from "@/lib/supabase-client";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

const jwtsk = process.env.JWT_SK;

export async function POST(request) {
  try {
    const body = await request.json();
    const { bug, steps, email, version, date, device, screenshot } = body;

    if(!bug || !steps || !version || !date || !device) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 403 });

    const newReport = [{
      bug, steps,
      "email": email || "",
      version, date, device,
      "screenshot": screenshot || "",
    }];

    const { error } = await Supabase
    .from("bug-reports")
    .insert(newReport);

    if(error) return NextResponse.json({message: "Ha ocurrido un error al enviar tu reporte...", error: error.message}, { status: 500 });

    return NextResponse.json({message: "Reporte enviado con éxito, gracias por apoyar a CloudBook"});
  } catch(err) {
    console.log(err.message);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");

    const decoded = jwt.verify(token, jwtsk);
    if(!decoded || !decoded.aid) return NextResponse.json({ message: "Token invalido" }, { status: 401 });

    const { data, error } = await Supabase
    .from("bug-reports")
    .select("*");

    if(error) return NextResponse.json({ message: "Ha ocurrido un error al querer obtener los datos de los reportes de bugs", error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Reportes de bugs obtenidos", reports: data });
  } catch(err) {
    console.log(err.message);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}