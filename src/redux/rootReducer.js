import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
});

export default rootReducer;
