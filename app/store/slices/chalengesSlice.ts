import { getAllChalenges } from '@/app/api/chalengeApi';
import { chalenge } from '@/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createChallenge, deletChalenge } from '../../api/chalengeApi';


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

   export const createChallengeAction = createAsyncThunk(
    "chalenges/create",
    async (chalenge:chalenge)=>{
        const Challenge = await createChallenge(chalenge);
        return Challenge
    }
   );

   export const deletChalengeAction = createAsyncThunk(
    "chalenged/delete",
    async (chalengeId:string)=>{        
        const deletedChalenge = await deletChalenge(chalengeId);
        return deletedChalenge
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
        .addCase(createChallengeAction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createChallengeAction.fulfilled, (state,action)=>{
            state.chalenges = [...state.chalenges, action.payload];
            state.isLoading = false
        })
        .addCase(createChallengeAction.rejected, (state)=>{
            state.isLoading = false;
            state.error = 'wont work'
        })
        .addCase(deletChalengeAction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deletChalengeAction.fulfilled, (state,action)=>{
            state.chalenges =state.chalenges.filter((chalenge)=>chalenge._id != action.payload._id)
            state.isLoading = false
        })
        .addCase(deletChalengeAction.rejected, (state)=>{
            state.isLoading = false;
            state.error = 'wont work'
        })
    }
   });

   export const chalengReducer = chalengeSlice.reducer