import { NextResponse } from 'next/server'
import { configs } from './assets/configs/enviroments'

import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const miCookie = request.cookies.get(configs.NOMBRE_TOKEN)
  if (!miCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/privado/:path*',
}
