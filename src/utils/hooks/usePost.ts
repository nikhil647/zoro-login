// hooks/usePostApi.js

import { useState } from 'react';

export const usePostApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (url: string, body : any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(response?.statusText || 'Something Went Wrong');
      }

      const responseData = await response.json();
      setData(responseData);
      return responseData;
    } catch (error :any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    postData,
    isLoading,
    error,
    data,
  };
};
