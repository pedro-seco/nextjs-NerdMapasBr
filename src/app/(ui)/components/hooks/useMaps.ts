import { useCallback, useEffect, useState } from "react";
import fetchData from "../../services/fetchData";
import { MapWithPOIsDTO } from "@/src/app/api/maps/types";

export default function useMaps() {
    const [allMaps, setAllMaps] = useState<MapWithPOIsDTO[]>([]);
    const [loading, setLoading] = useState(false);

    const updateMaps = useCallback(async () => {
            setLoading(true);

            try {
                const list = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/maps/`);
                setAllMaps(list);
            } catch(error) {console.error(error)
            } finally{ (setLoading(false)); }
            
        },[])
    
        useEffect(() => {
            updateMaps();
        }, [updateMaps]);
    
    return {allMaps, updateMaps, loading};
}