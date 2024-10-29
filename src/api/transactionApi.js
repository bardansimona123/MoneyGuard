import axios from "axios";

// API pentru adăugarea unei tranzacții
export const addTransactionApi = (transactionData) => {
  return axios.post("/api/transactions", transactionData);
};

// API pentru obținerea sumarului tranzacțiilor
export const fetchTransactionsSummaryApi = (month, year) => {
  return axios.get(`/api/transactions/summary?month=${month}&year=${year}`);
};
