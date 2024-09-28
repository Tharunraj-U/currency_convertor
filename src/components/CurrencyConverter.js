import React, { useState } from 'react';
import ReactCountryFlag from "react-country-flag";
import GlitterEffect from './GlitterEffect';

const currencies = [
  { code: 'USD', name: 'US Dollar', country: 'US' },
  { code: 'EUR', name: 'Euro', country: 'EU' },
  { code: 'JPY', name: 'Japanese Yen', country: 'JP' },
  { code: 'GBP', name: 'British Pound', country: 'GB' },
  { code: 'AUD', name: 'Australian Dollar', country: 'AU' },
  { code: 'CAD', name: 'Canadian Dollar', country: 'CA' },
  { code: 'CHF', name: 'Swiss Franc', country: 'CH' },
  { code: 'CNY', name: 'Chinese Yuan', country: 'CN' },
  { code: 'SEK', name: 'Swedish Krona', country: 'SE' },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'NZ' },
  { code: 'MXN', name: 'Mexican Peso', country: 'MX' },
  { code: 'SGD', name: 'Singapore Dollar', country: 'SG' },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'HK' },
  { code: 'NOK', name: 'Norwegian Krone', country: 'NO' },
  { code: 'KRW', name: 'South Korean Won', country: 'KR' },
  { code: 'TRY', name: 'Turkish Lira', country: 'TR' },
  { code: 'RUB', name: 'Russian Ruble', country: 'RU' },
  { code: 'INR', name: 'Indian Rupee', country: 'IN' },
  { code: 'BRL', name: 'Brazilian Real', country: 'BR' },
  { code: 'ZAR', name: 'South African Rand', country: 'ZA' },
  // ... (continue with more currencies to reach 100)
];

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/currency/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
      if (!response.ok) {
        throw new Error('Failed to convert currency');
      }
      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <>
      <GlitterEffect />
      <div className="currency-converter">
        <h2>Currency Converter</h2>
        <div className="input-group">
          <label>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="currency-select"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                <ReactCountryFlag countryCode={currency.country} svg /> {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="currency-select"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                <ReactCountryFlag countryCode={currency.country} svg /> {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="amount-input"
          />
        </div>
        <button onClick={handleConvert} className="convert-button">Convert</button>
        {result && (
          <div className="result">
            <h4>
              <ReactCountryFlag countryCode={currencies.find(c => c.code === fromCurrency).country} svg />
              {amount} {fromCurrency} = 
              <ReactCountryFlag countryCode={currencies.find(c => c.code === toCurrency).country} svg />
              {result.toFixed(2)} {toCurrency}
            </h4>
          </div>
        )}
        {error && (
          <div className="error">
            <h4>Error: {error}</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrencyConverter;