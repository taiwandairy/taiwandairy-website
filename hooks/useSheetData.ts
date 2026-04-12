import { useState, useEffect } from 'react';

const cache = new Map<string, { data: unknown[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useSheetData<T>(key: string, fetchFn: () => Promise<T[]>): {
  data: T[];
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T[]>(() => {
    const cached = cache.get(key);
    return cached ? (cached.data as T[]) : [];
  });
  const [loading, setLoading] = useState(!cache.has(key));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = cache.get(key);
    const isStale = !cached || Date.now() - cached.timestamp > CACHE_TTL;

    if (!isStale) return;

    let cancelled = false;
    fetchFn()
      .then(items => {
        if (cancelled) return;
        cache.set(key, { data: items, timestamp: Date.now() });
        setData(items);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [key, fetchFn]);

  return { data, loading, error };
}
