import { jwtVerify } from "jose";
import * as jose from 'jose';
import { NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register"];
const isAuthPages = (url: string) => AUTH_PAGES.some((page) => page.startsWith(url));
const auth0JWKSUrl = process.env.NEXT_PUBLIC_AUTH0_JWKS_URL as string
const secret = process.env.NEXT_PUBLIC_ACCESS_SECRET_KEY as string

async function verifyAuth0(token: string) {
    const jwks = jose.createRemoteJWKSet(new URL(auth0JWKSUrl!));
    try {
        await jose.jwtVerify(token.replace('Bearer ', ''), jwks);
        return NextResponse.next();
    } catch (e) {
      console.error('Authentication failed: Token could not be verified')
      const response = NextResponse.next();
      response.cookies.delete("token");
      response.cookies.delete("provider");
      NextResponse.redirect(new URL(`/`));
      return response;
    }
}

export async function middleware(request: any) {

  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("accessToken") ?? { value: null };
  const { value: provider } = cookies.get("provider") ?? { value: null };

    let hasVerifiedToken;

    // parse Auth0 token
    if (provider === 'auth0') {
      hasVerifiedToken = token && (await verifyAuth0(token));
     
      // parse JWT token
    } else if (provider === 'jwt') {
     
      try {
        const decodedToken = await jwtVerify(token, new TextEncoder().encode(secret));
        hasVerifiedToken = !!decodedToken;
      } catch (error) {
        const response = NextResponse.next();
        NextResponse.redirect(new URL(`/`, url));
        return response;
      }
    }

    const isAuthPageRequested = isAuthPages(nextUrl.pathname);

    if (isAuthPageRequested) {
      if (!hasVerifiedToken) {
        const response = NextResponse.next();
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
      return response;
    }

    return NextResponse.next();
  }


export const config = { matcher: ["/login", "/register", "/users/:path*", '/profile/:path*', '/companies/:path*', '/company-profile/:path*'] };