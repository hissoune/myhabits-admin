import axiosInstance from "./Client"



export const getAllUsers = async ()=>{
   const response = await axiosInstance.get('auth-service/auth/all_users');
   return response.data
}

export const banOrUnban = async (userId:string)=>{
   const response = await axiosInstance.patch(`auth-service/auth/userActivity/${userId}`);
   return response.data
}