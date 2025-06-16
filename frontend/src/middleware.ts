import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  'MinhaBMWSuperSecreta@2025_FinalProject'
);

async function getPayloadFromToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload;
    } catch {
        return null;
    }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ['/', '/authpage']; 
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    if (!publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/authpage', request.url));
    }
    return NextResponse.next();
  }

  const payload = await getPayloadFromToken(token);

  if (!payload) {
    const response = NextResponse.redirect(new URL('/authpage', request.url));
    response.cookies.delete('auth_token');
    return response;
  }

  if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(
        payload.role === 'admin' ? '/admin/dashboard' : '/dashboard',
        request.url
      ));
  }

  if (pathname.startsWith('/admin') && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    /*
     * Faz o match de todas as rotas, EXCETO as que:
     * - Começam com /api (rotas de API)
     * - Começam com /_next/static (arquivos estáticos do Next.js)
     * - Começam com /_next/image (arquivos de otimização de imagem)
     * - Contêm um ponto (.), o que geralmente indica um arquivo (ex: .png, .ico, .mp4)
     */
    '/((?!api|_next/static|_next/image|.*\\..*).*)',
  ],
}