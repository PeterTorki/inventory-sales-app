import { useState, useMemo, useCallback } from "react";

export const useSearch = <T extends Record<string, any>>(data: T[], keys: (keyof T)[] = []) => {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!query.trim()) return data;

    const lowerQuery = query.toLowerCase();

    return data.filter((item) =>
      keys.some((key) => {
        const value = String(item[key] ?? "").toLowerCase();
        return value.includes(lowerQuery);
      })
    );
  }, [data, query, keys]);

  const handleSearch = useCallback((text: string) => setQuery(text), []);

  const clearSearch = useCallback(() => setQuery(""), []);

  return { query, setQuery, handleSearch, clearSearch, filteredData };
};
