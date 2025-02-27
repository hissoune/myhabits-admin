import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "./app/api/Client";


export async function middleware(req: NextRequest) {


    const token = req.cookies.get("auth_token")?.value;
  
    const unauthRoutes = ["/login", "/register"];
    const adminRoutes = ["/dashboard"];


    
    if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
        return NextResponse.next();
      }
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      
    
      const response = await axiosInstance.get(`auth-service/auth/verify`);
      
      if (response.status == 401) {
        return NextResponse.redirect(new URL("/login", req.url));

      }
    const decoded = response.data;

    if (adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && decoded.role != "admin") {
        return NextResponse.redirect(new URL("/unauthozized", req.url));
      }
     
 const res = NextResponse.next();
 res.cookies.set("user_data", JSON.stringify(decoded));
 return res;

   

}

export const config = {
    matcher: [
     
      "/dashboard",
      "/login",
      "/register",
    ],
  };