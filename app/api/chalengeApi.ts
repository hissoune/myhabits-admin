import { chalenge } from "@/types";
import axiosInstance from "./Client"



export const getAllChalenges = async ()=>{
    try {
        const response = await axiosInstance.get('chalenges-service/chalenges');
        return response.data;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to fetch challenges");
    }
}

export  const createChallenge = async (chalenge:chalenge)=>{
    try {
        const response = await axiosInstance.post('chalenges-service/chalenges', chalenge);
        return response.data;
    } catch (error) {
        console.log(error);

        throw new Error("Failed to create challenge");
    }
}

export const deletChalenge =async (chalengeId:string)=>{
    const response = await axiosInstance.delete(`chalenges-service/chalenges/${chalengeId}`);    
    return response.data
}