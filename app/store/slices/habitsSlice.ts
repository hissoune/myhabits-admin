import { getAllHabits, reActiveHabit } from '@/app/api/habitsApi';
import { Habit } from '@/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteHabit } from '../../api/habitsApi';


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
        
        return habits
    }
);

export const deleteHabitAction = createAsyncThunk(
    "habits/delete",
    async (habitId:string)=>{
        const deletedHabit = await deleteHabit(habitId)
        return deletedHabit
    }
);

export const reActiveHabitAction = createAsyncThunk(
    "habits/reactive",
    async (habitId:string)=>{
        const habit = await reActiveHabit(habitId)
        return habit
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
        .addCase(reActiveHabitAction.pending, (state)=>{
            state.isLoading = true;

        })
        .addCase(reActiveHabitAction.fulfilled, (state,action)=>{
            state.habits = state.habits.map((habit)=>habit._id == action.payload._id ?action.payload:habit)
            state.isLoading = false;

        })
        .addCase(deleteHabitAction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deleteHabitAction.fulfilled, (state,action)=>{
            state.habits = state.habits.filter((habit)=> habit._id != action.payload._id);
            state.isLoading = false

        })
        .addCase(deleteHabitAction.rejected, (state)=>{
            state.isLoading = false
            state.error = 'no dont '
        })
    }

});

export const habitsReducer = habitSlice.reducer