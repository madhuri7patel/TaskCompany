import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post('/api/auth/login', userData);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post('/api/auth/register', userData);
  return response.data;
});

export const verifyToken = createAsyncThunk('auth/verifyToken', async () => {
  const response = await axios.get('/api/auth/verify');
  return response.data;
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
  const response = await axios.get('/api/user/profile');
  return response.data;
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData) => {
  const response = await axios.put('/api/user/profile', profileData);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
