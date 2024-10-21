"use client"
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
  // No need to explicitly add thunk middleware unless you're customizing middleware
  // If you want to customize it:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware() // This includes thunk by default
});

export default store;
