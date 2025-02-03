import { cookies } from 'next/headers';
import axiosInstance from '../Client';
import { redirect } from 'next/navigation';

export async function DELETE (){

    try {
        (await cookies()).delete('token')
    } catch (error) {
        console.error("Logout error:", error);
        return { error: "Logout failed. Please try again." };
    }
}