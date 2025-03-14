import { getAllHabits } from '@/app/api/habitsApi';
import { Habit } from '@/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs';


const initialState:{
    habits:Habit[],
    habit:Habit|null,
    isLoading:boolean,
    error:string| null
    
}={
    habits:[],
    habit:null,
    isLoading:false,
    error:null
}

export  const getAllHabitsAction = createAsyncThunk(
    "habits/all",
    async ()=>{
        const habits = await getAllHabits();
        console.log(habits);
        
        return habits
    }
);

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllHabitsAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllHabitsAction.fulfilled, (state,action)=>{
            state.habits = action.payload;
            state.isLoading = false;
        })
        .addCase(getAllHabitsAction.rejected, (state)=>{
            state.error = "wrong idea"
        })
    }

});

export const habitsReducer = habitSlice.reducer