
import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
 async (config) => {
    const token =await getCookie('token') 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
    return config;
  },
 
);



export default axiosInstance;
