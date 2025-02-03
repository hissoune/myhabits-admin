import axios from "axios";
import { cookies } from "next/headers"; 

const axiosInstance = axios.create({
  baseURL: 'http://192.168.8.254:3000/api/',
});

axiosInstance.interceptors.request.use(
 async (config) => {
    const token = (await cookies()).get("token")?.value; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirect to login or refresh token.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
