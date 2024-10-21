"use client"
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  loading: false,
  success: null,
  error: null,
};

// Slice
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    taskCreateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    taskCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    taskCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  taskCreateRequest,
  taskCreateSuccess,
  taskCreateFailure,
} = taskSlice.actions;

export default taskSlice.reducer;

// Thunk function for creating a task
export const createTask = (taskData) => async (dispatch) => {
  dispatch(taskCreateRequest());
  try {
    const response = await fetch('http://localhost:3000/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const data = await response.json();
    console.log(data);
    dispatch(taskCreateSuccess(data));
  } catch (error) {
    dispatch(taskCreateFailure(error.message));
  }
};
