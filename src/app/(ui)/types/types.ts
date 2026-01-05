import { COORTYPE, ENTITIES } from "./enums";

// CreateMap Types
export type Borders = {
    sw: { longitude: number; latitude: number};
    ne: { longitude: number; latitude: number};
}

export const LIMITS: Record<COORTYPE, { min: number; max: number }> = {
  [COORTYPE.LAT]: { min: -90, max: 90 },
  [COORTYPE.LONG]: { min: -180, max: 180 },
};

export type FoundCity = {
  boundingbox: [string,string, string, string];
  lat: string;
  lon: string;
  name: string;
}

export type FormState =
  | { ok: true }
  | { ok: false; error: string;};

//Map Window
export type lngLatEvent = {
  lngLat :{
    lat:number,
    lng:number,
  }
}


  //Common Types
export type ButtonDeleteInputProps = {
    id:number;
    entity:ENTITIES;
}

export type ButtonDeleteAllInputProps = {
    id?:number;
    entity:ENTITIES;
}

