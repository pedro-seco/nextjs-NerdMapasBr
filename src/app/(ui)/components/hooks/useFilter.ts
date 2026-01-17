import { useMemo, useState } from "react";

export function useFilter<T>(data: T[], type: (item: T) => string){
    const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return [...data].sort((a, b) => type(a).localeCompare(type(b)));
    }

    const normalize = (text: string) => 
      text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const normalizedQuery = normalize(searchQuery);

    return data
      .filter((item) => normalize(type(item)).includes(normalizedQuery))
      .sort((a, b) => type(a).localeCompare(type(b)));

  }, [data, searchQuery, type]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
}