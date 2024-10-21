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
    taskUpdateRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      taskUpdateSuccess: (state, action) => {
        state.loading = false;
        state.success = action.payload;
        // Update the tasks array with the edited task
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // Replace the updated task
        }
      },
      taskUpdateFailure: (state, action) => {
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
  taskUpdateRequest,
  taskUpdateSuccess,
  taskUpdateFailure,
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

// update
// update
// Thunk function for updating a task
// Thunk function for updating a task
export const updateTask = (taskData) => async (dispatch) => {
    console.log("Updating task with ID:", taskData._id); // Debug log to see the ID
    dispatch(taskUpdateRequest());
    try {
        // Create a new object without the _id field
        const { _id, ...updatedData } = taskData; // Destructure to exclude _id

        const response = await fetch(`http://localhost:3000/api/update/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Send updatedData instead of taskData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Update error response:", errorData); // Log the error response for debugging
            throw new Error(errorData.message || 'Failed to update task');
        }

        const data = await response.json();
        console.log("Update response data:", data); // Log the successful response data
        dispatch(taskUpdateSuccess(data)); // Make sure the data structure matches your expectations
    } catch (error) {
        console.error("Update task error:", error); // Log any errors caught
        dispatch(taskUpdateFailure(error.message));
    }
};

