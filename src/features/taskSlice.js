"use client"
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  tasks: [],          // Store tasks here
  loading: false,     // Manage loading state
  success: null,      // Manage success message
  error: null,        // Manage error message
};

// Slice
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // Actions for creating a task
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
    // Actions for fetching tasks
    taskFetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    taskFetchSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;  // Store the fetched tasks
    },
    taskFetchFailure: (state, action) => {
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
  taskFetchRequest,
  taskFetchSuccess,
  taskFetchFailure,
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
    dispatch(taskCreateSuccess(data));
  } catch (error) {
    dispatch(taskCreateFailure(error.message));
  }
};

// Thunk function for fetching tasks
export const fetchTasks = () => async (dispatch) => {
  dispatch(taskFetchRequest());
  try {
    const response = await fetch('http://localhost:3000/api/task-get');
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch tasks');
    }

    dispatch(taskFetchSuccess(data.data));  // Dispatch tasks on success
  } catch (error) {
    dispatch(taskFetchFailure(error.message));
  }
};
