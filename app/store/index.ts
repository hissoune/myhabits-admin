import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { habitsReducer } from './slices/habitsSlice';

export const store = configureStore({
  reducer: {
     auth:authReducer,
     habits:habitsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
