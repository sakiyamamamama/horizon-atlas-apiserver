import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const allowedOrigin = "https://sakiyamamamama.github.io";
    
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Expose-Headers": "Set-Cookie",
    };
  
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { 
        status: 200, 
        headers: corsHeaders 
      });
    }
  
    const res = NextResponse.next();
    
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.headers.set(key, value);
    });
  
    return res;
  }