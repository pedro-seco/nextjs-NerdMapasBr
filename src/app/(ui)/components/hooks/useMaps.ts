import {  MapWithPOIsDTO } from "@/src/app/api/maps/types";
import { useCallback } from "react";
import fetchData from "../../services/fetchData";

export function useMaps() {

    const fetchAllMaps = useCallback(async (): Promise<MapWithPOIsDTO[]> => {
        return fetchData('http://localhost:3000/api/maps');
    }, []);

    return {fetchAllMaps}
}