
import axiosInstance from "./Client"


export const getAllHabits = async ()=>{
 const response = await axiosInstance.get('habits-service/habits/all_for_admin');
 return response.data
}