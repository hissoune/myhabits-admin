import axiosInstance from "./Client"



export const getAllUsers = async ()=>{
   const response = await axiosInstance.get('auth-service/auth/all_users');
   return response.data
}