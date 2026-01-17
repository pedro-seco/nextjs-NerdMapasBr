import { useCallback, useEffect, useState } from "react";
import fetchData from "../../services/fetchData";
import { MapWithPOIsDTO } from "@/src/app/api/maps/types";

export default function useMaps() {
    const [allMaps, setAllMaps] = useState<MapWithPOIsDTO[]>([]);
    const [loading, setLoading] = useState(false);

    const updateMaps = useCallback(async () => {
            setLoading(true);

            try {
                const list = await fetchData('http://localhost:3000/api/maps/'); // TODO - TRANSFORMAR BASE URL EM CONST .ENV
                setAllMaps(list);
            } catch(error) {console.error(error)
            } finally{ (setLoading(false)); }
            
        },[])
    
        useEffect(() => {
            updateMaps();
        }, [updateMaps]);
    
    return {allMaps, updateMaps, loading};
}