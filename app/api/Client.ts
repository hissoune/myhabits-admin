import axios from "axios";
import { cookies } from "next/headers"; 

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

axiosInstance.interceptors.request.use(
 async (config) => {
    const token = (await cookies()).get("auth_token")?.value; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"]=["application/json"]
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
