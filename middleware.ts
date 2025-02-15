import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // CORS プリフライトリクエストに対応
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: res.headers });
  }

  return res;
}

// CORS を適用するパスを指定
export const config = {
  matcher: "/api/:path*",
};
