import { useState, useEffect } from 'react';
import { type IScraped } from '@/types/Match';

export const useIplData = () => {
  const [data, setData] = useState<IScraped | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/scrape');
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const result: IScraped = await res.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return { data, loading, error };
};