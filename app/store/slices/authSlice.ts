import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import { User } from '@/types';
import Cookies from 'js-cookie';
import { banOrUnban, getAllUsers } from '@/app/api/usersApi';
import { login } from '@/app/api/authApi';
import { deleteCookie, setCookie } from 'cookies-next';

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
       const loggedIn = await login(Credentials);
       return loggedIn
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

export const  banOrUnbanAction = createAsyncThunk(
    "users/ban",
    async (userId:string)=>{
      const user = await banOrUnban(userId)
      return user
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAction: (state) => {
            state.user = null;
            state.token = null;
            state.inAuth= false
            deleteCookie('token');
            deleteCookie('role');
         
         
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
            .addCase(loadUser.rejected, (state) => {
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
            .addCase(registerAction.rejected, (state)=>{
                state.error = 'registration fail'
                state.isLoading=false
            })
            .addCase(loginAction.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(loginAction.fulfilled, (state,action)=>{
                 state.user = action.payload.user;                 
                state.inAuth = true;
                state.token = action.payload.token;
                setCookie('token', action.payload.token, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                  });
                  setCookie('user', action.payload.user, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                  });
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
                 state.users = action.payload;
                state.isLoading = false
            })
            .addCase(getAllUsersAction.rejected, (state)=>{
                state.error ="not for you "
            })
            .addCase(banOrUnbanAction.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(banOrUnbanAction.fulfilled, (state,action)=>{
                 state.users =  state.users.map((user)=> user._id == action.payload._id ?action.payload:user);
                state.isLoading = false
            })
            .addCase(banOrUnbanAction.rejected, (state)=>{
                state.error ="not for you "
            })
            
    },
});
export const {logoutAction} = authSlice.actions
export const authReducer =authSlice.reducer ;

