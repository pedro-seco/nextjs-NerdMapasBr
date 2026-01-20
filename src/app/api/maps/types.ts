import { POIs, Prisma } from "@/prisma/generated/prisma/client"
import { POIsDTO } from "../points/[pointId]/types"

export type MapWithPOIsDTO = {
    id: number, 
    name: string,
    latitude: number,
    longitude: number,
    borders: any, 
    pois: POIsDTO[],
    createdAt: Date
}

export type MapDTO = {
    id:number,
    name: string
    latitude: number,
    longitude: number,
    borders: any,
    createdAt: Date
}

export type createPointBody = {
    name: string,
    lat: number,
    lng: number,
}

export type createMapBody = {
    name: string,
    pois?: POIs[]
    latitude: number,
    longitude: number,
    borders: any
}

export type mapWithPOIs = Prisma.MapGetPayload<{include:{pois: true}}>