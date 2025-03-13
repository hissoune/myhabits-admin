import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import { User } from '@/types';
import Cookies from 'js-cookie';
import { getAllUsers } from '@/app/api/usersApi';

const initialState:{
    user: User |null,
    users:User[]
    token:string | null,
    inAuth: boolean,
    isLoading: boolean,
    error: string | null,
} = {
    user: null,
    users:[],
    token:null,
    inAuth: false,
    isLoading: false,
    error: null,
};

export const registerAction = createAsyncThunk(
    'auth/register',
    async (user:User) => {
     
      return user;
    }
);
export const loginAction= createAsyncThunk(
    "auth/login",
    async (Credentials:{email:string,password:string},{ rejectWithValue })=>{
     try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: Credentials.email, password: Credentials.password }),
          });

          if (!response.ok) {
            throw new Error('Invalid credentials');
          }

          const data = await response.json();

          return data;
     } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        } else {
            return rejectWithValue('An unknown error occurred');
        }
     }
    }
);

export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async ()=>{
        const user= await Cookies.get("user");
        const token= await Cookies.get("token");
        //add here the call of the function of verify the token 
        //.....           
        return user && token ? JSON.parse(user):null;
    }
);

export const getAllUsersAction = createAsyncThunk(
    "auth/allUsers",
    async ()=>{
        const users = await getAllUsers();
        return users
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAction:  (state)=>{
           state.user = null ;
           state.token = null;
           Cookies.remove('token');
           Cookies.remove('user');
           state.inAuth = false;
         
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                if (action.payload != null){
                    state.user=action.payload;
                    state.inAuth=true;
                
                }
                state.isLoading=false

            })
            .addCase(loadUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = 'user not exist';
            })
            .addCase(registerAction.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(registerAction.fulfilled, (state,action)=>{
                state.user = action.payload;
                console.log(state.user);
                
                state.isLoading = false;
            })
            .addCase(registerAction.rejected, (state,action)=>{
                state.error = 'registration fail'
                state.isLoading=false
            })
            .addCase(loginAction.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(loginAction.fulfilled, (state,action)=>{
                 state.user = action.payload.user;                 
                state.inAuth = true
                state.token = action.payload.token;
                Cookies.set('token', action.payload.token, { expires: 7 });
                Cookies.set('user', JSON.stringify(action.payload.user), { expires: 7 }); 
                state.isLoading = false

            })
            .addCase(loginAction.rejected, (state)=>{
                state.error = "login faioled";
                state.isLoading = false
            })
            .addCase(getAllUsersAction.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getAllUsersAction.fulfilled, (state,action)=>{
                 state.users = action.payload,
                state.isLoading = false
            })
            .addCase(getAllUsersAction.rejected, (state)=>{
                state.error ="not for you "
            })
            
    },
});
export const {logoutAction} = authSlice.actions
export const authReducer =authSlice.reducer ;

