import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/a83ed8a00d24f0fefeaf860e",
});

// Function to fetch the list of supported currencies
export const fetchCurrencies = async () => {
  try {
    const response = await api.get("/codes"); // API endpoint to fetch currency codes
    const { supported_codes } = response.data; // Destructure the list
    return supported_codes.map(([code, name]) => ({ code, name }));
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return []; // Return an empty array on error
  }
};

// Function to fetch currency conversion data
export const CurrencyConverter = (fromCurrency, toCurrency, amount) => {
  return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
};
