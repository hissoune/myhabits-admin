import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { habitsReducer } from './slices/habitsSlice';
import { chalengReducer } from './slices/chalengesSlice';

export const store = configureStore({
  reducer: {
     auth:authReducer,
     habits:habitsReducer,
     chalenges:chalengReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
