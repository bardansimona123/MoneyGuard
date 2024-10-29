// src/features/auth/authOperations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInApi, registerApi, fetchUserInfoApi } from "../../api/authApi";

// Logare
export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await logInApi(credentials);
      return response;
    } catch (error) {
      return rejectWithValue("Login failed. Please check your credentials.");
    }
  }
);

// Înregistrare
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

// Obține informațiile utilizatorului
export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserInfoApi();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch user information.");
    }
  }
);
