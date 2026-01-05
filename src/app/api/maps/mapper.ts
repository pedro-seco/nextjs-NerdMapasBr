import { toPOIsDTO } from "../points/[pointId]/mapper";
import { MapWithPOIsDTO, MapDTO, mapWithPOIs } from "./types";
import { Map } from "@/prisma/generated/prisma/browser";

export function toMapWithPOIsDTO(maps: mapWithPOIs): MapWithPOIsDTO{
    return {
        id: maps.id,
        name: maps.name!,
        latitude: maps.latitude,
        longitude: maps.longitude,
        borders: maps.borders,
        pois: maps.pois.map(toPOIsDTO),
        createdAt: maps.createdAt
    }
}

export function toMapDTO(maps: Map):MapDTO{
    return {
        id: maps.id,
        name: maps.name!,
        latitude: maps.latitude,
        longitude: maps.longitude,
        borders:maps.borders,
        createdAt: maps.createdAt
    }
}