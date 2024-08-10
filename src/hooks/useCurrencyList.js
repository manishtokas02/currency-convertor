import { useEffect, useState } from 'react';

function useCurrencyList() {
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        if (!response.ok) {
          throw new Error('Failed to fetch currencies');
        }
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrencies();
  }, []);

  // Convert currency codes to uppercase
  const normalizedCurrencies = Object.fromEntries(
    Object.entries(currencies).map(([code, name]) => [code.toUpperCase(), name])
  );

  return { currencies: normalizedCurrencies, loading, error };
}

export default useCurrencyList;
