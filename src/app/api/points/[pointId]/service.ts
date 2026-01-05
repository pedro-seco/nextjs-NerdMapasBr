import { prisma } from "@/src/app/lib/prisma";
import { toPOIsDTO } from "./mapper";
import { editPOIsBody, POIsDTO } from "./types";


export async function searchPOIs(id:number): Promise<POIsDTO | null>{
    const point = await prisma.pOIs.findUnique({
        where: {id: id},
    });
    return point ? toPOIsDTO(point) : null;
}

export async function editPOIs(
    id: number,
    body: editPOIsBody): Promise<POIsDTO>{
    
    const pOI = await prisma.pOIs.update({
        where: {id: id},
            data: {
            name: body.name
            },
        });

    return toPOIsDTO(pOI); 
}

export async function deletePOIs(id:number) {
    return await prisma.pOIs.delete({
            where: {id: id}
            });

}

