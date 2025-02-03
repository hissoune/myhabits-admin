"use server"

import { cookies } from 'next/headers';
import axiosInstance from '../Client';
import { redirect } from 'next/navigation';

export async function POST (data:{email:string,password:string}){

    try {
        const response = await axiosInstance.post(`auth/login`,data);

        if (response) {
            (await cookies()).set('token',response.data.token);
           return response.data
        }
    } catch (error) {
        console.error("Login error:", error);
        return { error: "Login failed. Please try again." };
    }
}