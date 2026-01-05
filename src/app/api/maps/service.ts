import { prisma } from "@/src/app/lib/prisma";
import { toMapWithPOIsDTO, toMapDTO } from "./mapper";
import { mapWithPOIs, createMapBody, MapDTO } from "./types";

export async function searchMaps(): Promise<mapWithPOIs[]> {
    const foundMaps = await prisma.map.findMany({
        include: {pois: true},
        });
    return foundMaps.map(toMapWithPOIsDTO)
}

export async function createMap(body:createMapBody): Promise<MapDTO>{
    
    const mapaCriado = await prisma.map.create({
            data: {
                name: body.name,
                latitude: body.latitude,
                longitude:body.longitude,
                borders: body.borders
            },
        });

    return toMapDTO(mapaCriado);
}