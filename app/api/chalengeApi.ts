import { chalenge } from "@/types";
import axiosInstance from "./Client"



export const getAllChalenges = async ()=>{
const response = await axiosInstance.get('chalenges-service/chalenges');
return response.data
}

export  const createChallenge = async (chalenge:chalenge)=>{
    const response = await axiosInstance.post('chalenges-service/chalenges',chalenge);
    return response.data
}

export const deletChalenge =async (chalengeId:string)=>{
    const response = await axiosInstance.delete(`chalenges-service/chalenges/${chalengeId}`);
    console.log();
    
    return response.data
}