import { NextResponse } from "next/server";

export function authMiddleware(req, next) {
  const apiKey = req.headers['api-key'];
  const expectedApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== expectedApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  next();
}

export const config = {
  matcher: '/api/:path*',
};