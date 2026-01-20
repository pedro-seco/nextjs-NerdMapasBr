import { useState, useEffect, useCallback } from 'react';
import { NominatingResponse } from '../../types/types';
import fetchData from '../../services/fetchData';

export default function useNominatim() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<NominatingResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const searchNominatim = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
        const url = `https://nominatim.openstreetmap.org/search?` +
          new URLSearchParams({
            q: searchQuery,
            countrycodes: 'br',
            addressdetails: '1',
            format: "jsonv2",
          });

        const results = await fetchData(url,{
            headers: {
                "User-Agent": "teste-tecnico/1.0 (pedrinho.seco@gmail.com)",
                "Accept-Language": "pt-BR"
            },
            cache: "no-store",
        }
        
    ) as NominatingResponse[];

    setSuggestions(results);
    
    } catch (error) { console.error("Erro ao buscar no Nominatim:", error); setSuggestions([]);
    } finally { setLoading(false);}
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
        if(query) {
            searchNominatim(query)
        } else { setSuggestions([]);}
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [query, searchNominatim]);

  return {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    loading,
  };
}