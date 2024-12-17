import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { fetchCurrencies, CurrencyConverter } from "./Api/PostApi";

// Styled Components
const GradientBackground = styled(Box)({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to bottom, #C02425, #7A1E4A)",
});

const ConverterCard = styled(Paper)({
  width: "400px",
  padding: "30px 20px",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
});

const ResultButton = styled(Button)({
  backgroundColor: "#4B3E65",
  color: "#fff",
  fontWeight: "bold",
  width: "100%",
  margin: "10px 0",
  "&:hover": {
    backgroundColor: "#3B2E55",
  },
});

const StyledSelect = styled(Select)({
  width: "150px",
  marginTop: "10px",
});

// Component
export default function CurrencyConverterApp() {
  const [currencies, setCurrencies] = useState([]); // State for currencies
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the supported currencies when the component mounts
  useEffect(() => {
    const loadCurrencies = async () => {
      const fetchedCurrencies = await fetchCurrencies();
      setCurrencies(fetchedCurrencies);
    };
    loadCurrencies();
  }, []);

  // Handle currency conversion
  const handleConvertCurrency = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await CurrencyConverter(fromCurrency, toCurrency, amount);
      setConvertedAmount(response.data.conversion_result);
      setLoading(false);
    } catch (error) {
      console.error("Conversion error:", error);
      setError("Failed to fetch conversion rate!");
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <ConverterCard>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#4B3E65" }}>
          CURRENCY CONVERTER
        </Typography>

        {/* Result */}
        {convertedAmount && (
          <Typography
            variant="h4"
            sx={{ margin: "10px 0", color: "#841F44", fontWeight: "bold" }}
          >
            {convertedAmount} {toCurrency}
          </Typography>
        )}

        {/* Input Section */}
        <Box marginY={2}>
          <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="Amount"
            variant="outlined"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
          />

          <Box display="flex" justifyContent="space-between">
            <Box>
              <StyledSelect
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                size="small"
              >
                {currencies.map(({ code, name }) => (
                  <MenuItem key={code} value={code}>
                    {code} - {name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Box>
            <Box>
              <StyledSelect
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                size="small"
              >
                {currencies.map(({ code, name }) => (
                  <MenuItem key={code} value={code}>
                    {code} - {name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Box>
          </Box>
        </Box>

        {/* Convert Button */}
        <ResultButton
          onClick={handleConvertCurrency}
          disabled={loading || !amount || amount <= 0}
        >
          {loading ? "Converting..." : "Convert"}
        </ResultButton>

        {/* Error Message */}
        {error && (
          <Typography color="error" marginTop={2}>
            {error}
          </Typography>
        )}
      </ConverterCard>
    </GradientBackground>
  );
}
