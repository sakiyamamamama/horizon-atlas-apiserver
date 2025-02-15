import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const allowedOrigin = "https://sakiyamamamama.github.io";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
  "Access-Control-Allow-Credentials": "true",
};
  
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { 
        status: 200, 
        headers: corsHeaders 
      });
    }
  
    const response = NextResponse.next();
    
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  
    return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}