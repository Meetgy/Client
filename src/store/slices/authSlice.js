import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'), // Retrieve token from localStorage if it exists
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const authReducers = authSlice.reducer;
