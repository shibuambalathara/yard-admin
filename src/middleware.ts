import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log('PATHNAME',request);
  

  //  console.log("This message is coming from MIDDLEWARE ");

  /* ignore routes starting with api and _next (temp solution)
    matchers in next.config isn't working
    without this the middleware will run more than once
   so to avoid this we will ignore all paths with /api and  /_next
   */
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/_next/')
  ) {
    return NextResponse.next()
  }

  // our logic starts from here

  let token = request.cookies.get('authToken')?.value // retrieve the token

  // console.log("TOKEN  FROM MIDDLEWARE", token);
  
  // let token = true// retrieve the token
  const allowedRoutes = ['/login', '/register','/resetpassword'] // list of allowed paths user can visit without the token
  const isRouteAllowed = allowedRoutes.some((prefix) => pathname.startsWith(prefix)) // check path and see if matches our list then return a boolean

  // redirect to login if no token
  // If the user is trying to access an allowed route, the request is processed
  //  normally. If the user is trying to access a protected route, they are redirected to the login page.
  if (!token) {
    if (isRouteAllowed) {
      // check if path is allowed
      return NextResponse.next() //NextResponse.next() to let the request continue to the requested route without any interruption.
      //By returning NextResponse.next(), the middleware function allows the request to continue its journey through the application
      //without any interruption.
    }
    // if path is not allowed redirect to signin page
    return NextResponse.redirect(new URL('/login', request.url))
  }

  //redirect to home page if logged in
  if (isRouteAllowed && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}


// import React from 'react'
//  const middleware = () => {
//   console.log("name");
 
//  }

export default middleware