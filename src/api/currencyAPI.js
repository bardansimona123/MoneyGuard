import axios from "axios";

const API_KEY = "4dec582c11354d6c939363ed3a711d41";
const BASE_URL = "https://openexchangerates.org/api/";

export const fetchCurrencyRates = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}latest.json?app_id=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw error;
  }
};
