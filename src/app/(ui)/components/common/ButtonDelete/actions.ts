'use server';

import { deleteMapWithPOIs } from "@/src/app/api/maps/[mapsId]/service";
import { deletePOIs } from "@/src/app/api/points/[pointId]/service";

export async function deleteMapAction(mapId: number){
    await deleteMapWithPOIs(mapId);
}

export async function deletePOIsAction(mapId: number){
    await deletePOIs(mapId);
}