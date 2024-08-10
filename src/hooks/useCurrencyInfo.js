import { useEffect, useState } from 'react';

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCurrencyInfo() {
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?base=${currency.toUpperCase()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch currency info');
        }
        const data = await response.json();
        setData(data.rates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrencyInfo();
  }, [currency]);

  return { data, loading, error };
}

export default useCurrencyInfo;
