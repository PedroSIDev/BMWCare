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
  
  // Lista de rotas que são consideradas públicas (páginas de login/registro)
  const publicPaths = ['/', '/authpage']; 

  // Pega o token do cookie
  const token = request.cookies.get('auth_token')?.value;

  // Lógica para usuários NÃO LOGADOS
  if (!token) {
    // Se o usuário não está logado e NÃO está tentando acessar uma rota pública,
    // redireciona para a página de login principal.
    if (!publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/authpage', request.url));
    }
    // Se ele já está em uma rota pública, permite o acesso.
    return NextResponse.next();
  }

  // Lógica para usuários JÁ LOGADOS
  const payload = await getPayloadFromToken(token);

  if (!payload) {
    // Token inválido, limpa o cookie e manda para o login
    const response = NextResponse.redirect(new URL('/authpage', request.url));
    response.cookies.delete('auth_token');
    return response;
  }

  // Se o usuário logado tentar acessar uma página pública, redireciona para seu dashboard
  if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(
        payload.role === 'admin' ? '/admin/dashboard' : '/dashboard',
        request.url
      ));
  }

  // Proteção da rota de admin
  if (pathname.startsWith('/admin') && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};