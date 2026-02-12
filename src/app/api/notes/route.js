import jwt from "jsonwebtoken";
import { AES, enc } from "crypto-js";
import { NextResponse } from "next/server";
import Supabase from "@/lib/supabase-client";
import { headers } from "next/headers";

const jwtsk = process.env.JWT_SK;
const cryptosk = process.env.CRYPTO_SK; 

export async function POST(request) {
  try {
    const body = await request.json();
    const { content, title } = body;
    const headersList = await headers();
    const token = headersList.get("Authorization");

    if(!content || !title) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 400 });
    if(!token) return NextResponse.json({ message: "Credenciales no ingresadas" }, { status: 401 });

    const decoded = jwt.verify(token, jwtsk);
    if(!decoded || !decoded.id) return NextResponse.json({ message: "Credenciales invalidas" }, { status: 401 });

    const { data: user, error: getUserError } = await Supabase
    .from("users")
    .select("notes")
    .eq("id", decoded.id)
    .single();

    if(getUserError) return NextResponse.json({ message: "Hubo un error al querer subir tus datos", error: getUserError.message }, { status:500 });

    const notes = user.notes || [];
    const encryptedTitle = AES.encrypt(title, cryptosk);
    const encryptedContent = AES.encrypt(content, cryptosk);

    const newList = {
      "title": encryptedTitle,
      "content": encryptedContent
    };

    notes.push(newList);

    const { error: uploadNoteError } = await Supabase
    .from("users")
    .update({ "notes": notes })
    .eq("id", decoded.id);

    if(uploadNoteError) return NextResponse.json({ message: "Hubo un error al subir la nota", error: uploadNoteError.message }, { status: 500 });

    return NextResponse.json({ message: "Nota subida con éxito" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { updatedTitle, updatedContent, noteIndex } = body;
    const headersList = await headers();
    const token = headersList.get("Authorization");

    if((!updatedTitle && !updatedContent) || !noteIndex) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 400 });
    if(!token) return NextResponse.json({ message: "Credenciales no ingresadas" }, { status: 401 });

    const decoded = jwt.verify(token, jwtsk);
    if(!decoded || !decoded.id) return NextResponse.json({ message: "Credenciales invalidas" }, { status: 401 });

    const { data: user, error: getUserError } = await Supabase
    .from("users")
    .select("notes")
    .eq("id", decoded.id)
    .single();

    if(getUserError) return NextResponse.json({ message: "Hubo un error al querer subir tus datos", error: getUserError.message }, { status:500 });

    const notes = user.notes;
    const noteSelected = notes[noteIndex - 1];

    const encryptedTitle = AES.encrypt(updatedTitle || noteSelected.title, cryptosk);
    const encryptedContent = AES.encrypt(updatedContent || noteSelected.content, cryptosk);

    noteSelected.title = encryptedTitle;
    noteSelected.content = encryptedContent;

    const { error: updateNoteError } = await Supabase
    .from("users")
    .update({ notes: notes })
    .eq("id", decoded.id);

    if(updateNoteError) return NextResponse.json({ message: "Hubo un error al querer actualizar tu nota", error: updateNoteError.message }, { status: 500 });

    return NextResponse.json({ message: "Nota actualizada con éxito" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { noteIndex } = body;
    const headersList = await headers();
    const token = headersList.get("Authorization");

    if(!noteIndex) return NextResponse.json({ message: "No se ingresaron los datos requeridos" }, { status: 400 });
    if(!token) return NextResponse.json({ message: "Credenciales no ingresadas" }, { status: 401 });

    const decoded = jwt.verify(token, jwtsk);
    if(!decoded || !decoded.id) return NextResponse.json({ message: "Credenciales invalidas" }, { status: 401 });

    const { data: user, error: getUserError } = await Supabase
    .from("users")
    .select("notes")
    .eq("id", decoded.id)
    .single();

    if(getUserError) return NextResponse.json({ message: "Hubo un error al querer subir tus datos", error: getUserError.message }, { status:500 });

    const notes = user.notes;
    notes.splice(noteIndex - 1, 1);

    const { error: updateUserNotesError } = await Supabase
    .from("users")
    .update({ "notes": notes })
    .eq("id", decoded.id);

    if(updateUserNotesError) return NextResponse.json({ message: "Hubo un error al querer borrar tu nota", error: updateUserNotesError.message }, { status:500 });

    return NextResponse.json({ message: "Nota borrada con éxito" })
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}