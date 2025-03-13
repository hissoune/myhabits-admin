import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next'; 


import { NextRequest } from 'next/server';
import axiosInstance from '../Client';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
console.log({ email, password } );



    const response = await axiosInstance.post('auth-service/auth/login',{ email, password });
    console.log(response);
    
    const { token, user } = response.data;

    setCookie('token', token, {
        req,
        res: NextResponse.next(),  
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        path: '/', 
      });
     const res = NextResponse.json({ user, token });
    
    return res;


 
   
 

}
