import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTransactionApi,
  fetchTransactionsSummaryApi,
} from "../../api/transactionApi";

// Operațiune asincronă pentru adăugarea unei tranzacții
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await addTransactionApi(transactionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Operațiune asincronă pentru obținerea rezumatului tranzacțiilor
export const fetchTransactionsSummary = createAsyncThunk(
  "transactions/fetchTransactionsSummary",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await fetchTransactionsSummaryApi(month, year);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
