import { chalenge } from "@/types";
import axiosInstance from "./Client"



export const getAllChalenges = async ()=>{
    try {
        const response = await axiosInstance.get('chalenges-service/chalenges');
        return response.data;
    } catch (error) {
        
        throw new Error(String(error));
    }
}

export  const createChallenge = async (chalenge:chalenge)=>{
    try {
        const response = await axiosInstance.post('chalenges-service/chalenges', chalenge);
        return response.data;
    } catch (error) {

        throw new Error(String(error));
    }
}

export const deletChalenge =async (chalengeId:string)=>{
    const response = await axiosInstance.delete(`chalenges-service/chalenges/${chalengeId}`);    
    return response.data
}