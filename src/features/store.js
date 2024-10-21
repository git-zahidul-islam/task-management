"use client"
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

const store = configureStore({
  reducer: {
    task: taskReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

export default store;
