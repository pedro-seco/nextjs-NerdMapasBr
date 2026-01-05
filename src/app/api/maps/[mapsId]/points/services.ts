import { toPOIsOnMapDTO } from "./mapper";
import { createPOIsBody } from "../../types";
import { prisma } from "@/src/app/lib/prisma";


export async function createPOIsOnMap(mapId: number,body: createPOIsBody): Promise<POIsOnMapDTO>{
    const createdPOI = await prisma.pOIs.create({
            data: {
                name:body.name,
                latitude:body.lat,
                longitude:body.lng,
                mapId:mapId,
            }
        });
    return toPOIsOnMapDTO(createdPOI);
}

export async function deleteAllPOIsOnMap(id:number){
    return await prisma.pOIs.deleteMany({
                where: {
                mapId: id,
            },
        });
}