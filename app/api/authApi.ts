import axiosInstance from "./Client";




export const login = async (Credentials:{email:string,password:string})=>{
    const response = await axiosInstance.post('auth-service/auth/login',Credentials);
    return response.data
}

