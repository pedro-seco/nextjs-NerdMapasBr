import { POIs } from "@/prisma/generated/prisma/client";

export function toPOIsOnMapDTO(pois: POIs): POIsOnMapDTO{
    return {
        id: pois.id,
        name: pois.name,
        latitude: pois.latitude,
        longitude: pois.longitude,
        mapId: pois.mapId
    }
}