import { jwtVerify } from "jose";
import * as jose from 'jose';
import { NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register"];
const isAuthPages = (url: string) => AUTH_PAGES.some((page) => page.startsWith(url));
const auth0JWKSUrl = process.env.NEXT_PUBLIC_AUTH0_JWKS_URL as string
const secret = process.env.NEXT_PUBLIC_ACCESS_SECRET_KEY as string

export async function verifyJWT(token: string, secret: string): Promise<jose.JWTPayload> {
const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
return payload
}


async function verifyAuth0(token: string) {
    const jwks = jose.createRemoteJWKSet(new URL(auth0JWKSUrl!));
    try {
        await jose.jwtVerify(token.replace('Bearer ', ''), jwks);
        return NextResponse.next();
    } catch (e) {
        console.error('Authentication failed: Token could not be verified')
        return new NextResponse(
            JSON.stringify({success: false, message: 'Authentication failed: Token could not be verified'}),
            {status: 401, headers: {'content-type': 'application/json'}}
        );
    }
}

export async function middleware(request: any) {
    
  const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get("accessToken") ?? { value: null };
    const { value: provider }  = cookies.get("provider") ?? { value: null };

    let hasVerifiedToken;

    if (provider === 'auth0') {
        hasVerifiedToken = token && (await verifyAuth0(token));
    } else if (provider === 'jwt') {
        hasVerifiedToken = token && (await verifyJWT(token, secret));
  }
   
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
        response.cookies.delete("token");
        response.cookies.delete("provider");
      return response;
    }
    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );
      response.cookies.delete("token");
      response.cookies.delete("provider");

    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: ["/login", "/register", "/users/:path*", '/profile/:path*', '/companies/:path*', '/company-profile/:path*'] };
