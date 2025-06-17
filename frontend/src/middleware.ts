import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('A variável de ambiente JWT_SECRET não está definida.');
}

// 3. Converta a chave para o formato que a biblioteca 'jose' espera
const SECRET_KEY = new TextEncoder().encode(jwtSecret);

/**
 * Verifica o token e retorna o payload se for válido.
 * Adicionamos um console.error para debugging no servidor.
 */
async function getPayloadFromToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    console.error('Falha na verificação do JWT:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ['/', '/authpage'];
  const token = request.cookies.get('auth_token')?.value;

  // Lógica para quando não há token
  if (!token) {
    if (!publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/authpage', request.url));
    }
    return NextResponse.next();
  }

  // Lógica para quando há token
  const payload = await getPayloadFromToken(token);

  // Se o token for inválido (expirado, malformado, etc.)
  if (!payload) {
    const response = NextResponse.redirect(new URL('/authpage', request.url));
    // Limpa o cookie inválido do navegador do usuário
    response.cookies.delete('auth_token');
    return response;
  }

  // Se o usuário logado tenta acessar uma página pública
  if (publicPaths.includes(pathname)) {
    return NextResponse.redirect(
      new URL(
        payload.role === 'admin' ? '/admin/dashboard' : '/dashboard',
        request.url
      )
    );
  }

  // Se um usuário não-admin tenta acessar uma rota de admin
  if (pathname.startsWith('/admin') && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Se tudo estiver OK, prossiga para a página solicitada
  return NextResponse.next();
}

// Seu config continua perfeito, não precisa mudar nada.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\..*).*)',
  ],
};