import { NextResponse } from "next/server";
import CryptoJS, { AES } from "crypto-js";

const cryptoSK = process.env.CRYPTO_SK

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
    const { content } = body;
    
    if(!content) return NextResponse.json({ message: "No se ingresaron los datos necesarios" }, { status: 403 });

    const decrypted = AES.decrypt(content, cryptoSK).toString(CryptoJS.enc.Utf8);

    return NextResponse.json({ message: "Desencriptación exitosa", content: decrypted });
  } catch (err) {
    return NextResponse.json({ message: "Ha ocurrido un error en el servidor", error: err.message }, { status: 500 });
  }
}