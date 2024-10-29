// src/redux/transactionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  fetchTransactionsSummary,
} from "./transactionOperations";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    summary: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(fetchTransactionsSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});

export default transactionSlice.reducer;
