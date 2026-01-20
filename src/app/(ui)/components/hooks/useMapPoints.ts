import { useCallback, useEffect, useState } from "react";
import fetchData from "../../services/fetchData";

export default function usePoints (mapsId:string | string[] |undefined) {
    const [allPoints, setAllPoints] = useState<POIsOnMapDTO[]>([]);
    const [loading, setLoading] = useState(false);

    const updatePoints = useCallback(async () => {
            if (!mapsId) {
                return;
            };
            setLoading(true);

            try {
                const list = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/maps/${mapsId}`);
                setAllPoints(list.pois);
            } catch(error) {console.error(error)
            } finally{(setLoading(false));}
            
        },[mapsId])
    
        useEffect(() => {
            updatePoints();
        }, [updatePoints]);
    
    return {allPoints, updatePoints, loading};
}