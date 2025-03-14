import { getAllChalenges } from '@/app/api/chalengeApi';
import { chalenge } from '@/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState :{
    chalenges:chalenge[],
    chalenge:chalenge | null,
    isLoading:boolean,
    error:string
   
   }={
       chalenges:[],
       chalenge:null,
       isLoading:false,
       error:''
   
   }

   export const getAllChalengesAction= createAsyncThunk(
    "chalenges",
    async ()=>{
        const chalenges = await getAllChalenges();
        return chalenges
    }
   );


   const chalengeSlice = createSlice({
    name: 'chalenges',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllChalengesAction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllChalengesAction.fulfilled, (state,action)=>{
            state.chalenges = action.payload;
            state.isLoading = false
        })
        .addCase(getAllChalengesAction.rejected, (state)=>{
            state.isLoading = false;
            state.error = 'wont work'
        })
    }
   });

   export const chalengReducer = chalengeSlice.reducer