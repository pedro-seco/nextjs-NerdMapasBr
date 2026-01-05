export type POIsDTO = {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    mapId: number
}

export type editPOIsBody = {
    name: string
}