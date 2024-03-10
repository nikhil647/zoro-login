import { useEffect, useState } from "react";

export function useFetch(url: string, options: any) {
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return { data, error, loading };
}
