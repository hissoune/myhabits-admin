
import axiosInstance from "./Client"


export const getAllHabits = async ()=>{
 const response = await axiosInstance.get('habits-service/habits/all_for_admin');
 return response.data
}

export const deleteHabit = async (habitId:string)=>{
    const response = await axiosInstance.delete(`habits-service/habits/${habitId}`);
    return response.data
}


export const reActiveHabit =async (habitId:string)=>{
    const response = await axiosInstance.patch(`habits-service/habits/${habitId}`);
    return response.data
}