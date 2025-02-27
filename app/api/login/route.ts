import { NextResponse } from "next/server";
import axiosInstance from "../Client";
import { serialize } from "cookie";  

export async function POST(req: Request) {
    const { email, password } = await req.json();

    try {
        const response = await axiosInstance.post(`auth-service/auth/login`, { email, password });

        if (!response.data.token) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const cookie = serialize("auth_token", response.data.token, {
            httpOnly: true, 
            path: "/", 
            expires: new Date(Date.now() + 60 * 60 * 1000),  
        });

        const res = NextResponse.json({ message: "Login successful" });
        res.headers.set("Set-Cookie", cookie);

        return res;
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
