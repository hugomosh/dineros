import React, { useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");

  // Currency data with flags, symbols, and country names
  const currencies = {
    USD: {
      flag: "🇺🇸",
      name: "US Dollar",
      symbol: "$",
      country: "United States",
    },
    MXN: {
      flag: "🇲🇽",
      name: "Mexican Peso",
      symbol: "$",
      country: "Mexico",
    },
    COP: {
      flag: "🇨🇴",
      name: "Colombian Peso",
      symbol: "$",
      country: "Colombia",
    },
    EUR: {
      flag: "🇪🇺",
      name: "Euro",
      symbol: "€",
      country: "European Union",
    },
  };

  // Exchange rates (as of a fixed date for demonstration)
  const rates = {
    USD: 1,
    MXN: 16.71,
    COP: 3936.85,
    EUR: 0.92,
  };

  // Convert the amount to all currencies
  const convertAll = (value: number, from: string) => {
    const baseAmount = value / rates[from];
    return Object.entries(rates).map(([currency, rate]) => ({
      currency,
      value: (baseAmount * rate).toFixed(2),
      ...currencies[currency],
    }));
  };

  const handleAmountChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const results = convertAll(parseFloat(amount) || 0, fromCurrency);

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Currency Converter</h2>
        </div>
        <div className="space-y-6">
          {/* Amount Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{currencies[fromCurrency].symbol}</span>
            </div>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full pl-8 p-2 border rounded-lg"
              placeholder="Enter amount"
            />
          </div>

          {/* Currency Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Currency</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.entries(currencies).map(([code, data]) => (
                <button
                  key={code}
                  onClick={() => setFromCurrency(code)}
                  className={`p-3 rounded-lg border transition-colors duration-200 flex flex-col items-center gap-1
                    ${fromCurrency === code ? "bg-blue-50 border-blue-500" : "hover:bg-gray-50"}`}
                >
                  <span className="text-2xl">{data.flag}</span>
                  <span className="text-sm font-medium">{code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Converted Amounts</h3>
            <div className="space-y-2">
              {results.map(({ currency, value, flag, name, symbol }) => (
                <div
                  key={currency}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    currency === fromCurrency ? "bg-blue-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{currency}</span>
                      <span className="text-sm text-gray-600">{name}</span>
                    </div>
                  </div>
                  <span className="font-medium">
                    {symbol}
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
