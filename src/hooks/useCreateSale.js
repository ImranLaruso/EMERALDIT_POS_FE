import { useState, useEffect } from 'react';
import { createSale } from '../http/saleApi';

function useCreateSale(dependencyArr = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = () => {
    setLoading(true);

    createSale()
      .then(res => {
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(callApi, dependencyArr);

  return {
    loading,
    error,
    data,
  };
}

export default useCreateSale;
