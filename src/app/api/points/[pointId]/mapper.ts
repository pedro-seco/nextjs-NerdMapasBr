import { POIs } from "@/prisma/generated/prisma/client";

export function toPOIsDTO(pOI: POIs): POIsDTO{
    return {
        id: pOI.id,
        name: pOI.name,
        latitude: pOI.latitude,
        longitude: pOI.longitude,
        mapId:pOI.mapId
    }
}