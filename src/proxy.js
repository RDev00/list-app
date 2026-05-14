import { NextResponse } from "next/server"

export function proxy(req) {
  //Verifica si está en producción (vercel)
  if(!process.env.IS_PRODUCTION) return NextResponse.next();

  const api_key = req.headers.get('cloudbook-api-key');
  const valid_key = process.env.API_KEY;

  if(!valid_key) throw new Error("API Key no insertada");

  if(!api_key) return NextResponse.json({
    message: "API Key no insertada",
    error: "Bad request"
  }, {
    status: 403
  });

  if(api_key !== valid_key) return NextResponse.json({
    message: "API Key invalida",
    error: "Unauthorized"
  }, {
    status: 401
  });

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
  ]
}