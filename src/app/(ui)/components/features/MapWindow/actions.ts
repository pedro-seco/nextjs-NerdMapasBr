'use server';
import { createPOIsOnMap } from "@/src/app/api/maps/[mapsId]/points/services";
import { createPOIsBody } from "@/src/app/api/maps/types";

export async function CreatePOIsOnMapAction(mapId: number, POIs: createPOIsBody){
    await createPOIsOnMap(mapId, POIs);
}