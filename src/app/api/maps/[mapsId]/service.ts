import { MapWithPOIsDTO} from "../types";
import { toMapWithPOIsDTO } from "../mapper";
import { prisma } from "@/src/app/lib/prisma";

export async function searchMapWithPOIs(id:number): Promise<MapWithPOIsDTO | null>{
    const maps = await prisma.map.findUnique({
        where: {id: id},
        include: {pois: true}
    });
    return maps ? toMapWithPOIsDTO(maps) : null;
}

export async function deleteMapWithPOIs(id:number) {
    await prisma.pOIs.deleteMany({
            where: {mapId: id}
        });

    await prisma.map.delete({
            where: {id: id},
            include: {pois: true}
        });
}

export async function deleteAllMaps(){
    await prisma.pOIs.deleteMany({});
    await prisma.map.deleteMany({});
}
