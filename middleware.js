import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

export async function middleware(req){

    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: false
    })


    if(req.nextUrl.pathname.startsWith('/auth') && token){
        return NextResponse
            .redirect(
                new URL([
                    req.nextUrl.origin,'/'
                ].join('')),
                req.url
            );
    }

    if(
        req
            .nextUrl
            .pathname
            .startsWith('/dashboard') &&
        !token
    ){
        return NextResponse
            .redirect(
                new URL([
                    req.nextUrl.origin,'auth/login'
                ].join('/')),
                req.url
            );
        //http://localhost:3000/auth/login
    }

    // return NextResponse.next();
}


export const config = {
    matcher:[
        '/dashboard/:path*',
        '/dashboard',
        '/auth/:path*',
        '/auth'
    ]
}