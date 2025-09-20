import { NextRequest, NextResponse } from 'next/server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers'

// Especificar as rotas protected e public
const protectedRoutes = ['/dashboard', '/edit-expenses', '/edit-hours', '/edit-profit', '/edit-projects', '/edit-profile']
const publicRoutes = ['/login', '/register', '/']

export default async function middleware(req: NextRequest) {
    // Checar as rotas
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // Decriptar o session do cookie
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access-token')?.value
    const secret = process.env.AUTH_SECRET || '';
    const session = await decode({
        token: access_token,
        secret,
        salt: process.env.AUTH_SALT || ''
    })

    // Redireciona para /dashboard se o usuário estiver autenticado e for uma rota protegida
    if (!isProtectedRoute && session?.id) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    // Redireciona para /login se o usuário não estiver autenticado
    if (isProtectedRoute && !session?.id) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Redireciona para /dashboard se o usuário estiver autenticado
    if (
        isPublicRoute &&
        session?.id &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}