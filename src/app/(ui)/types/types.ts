import { MapDTO } from "../../api/maps/types";
import { ENTITIES } from "./enums";

// CreateMap Types
export type Borders = {
    sw: { longitude: number; latitude: number};
    ne: { longitude: number; latitude: number};
}

export type FormState =
  | { ok: true }
  | { ok: false; error: string;};

export type FormError = {
  ok: false; 
  error: string; 
  data: null
}

export type CreateMapFormState =
  | { ok: true; data?: MapDTO }
  | FormError

export type NominatingAddressResponse = {
  [key: string]: string | undefined;

  house_number?: string;
  road?: string
  suburb?: string;
  city_district?: string;
  city?: string;
  municipality?: string;
  county?: string;
  state_district?: string;
  state?: string;
  "ISO3166-2-lvl4"?: string;
  region?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

export type NominatingResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  adresstype: string;
  name: string;
  display_name: string;
  address: NominatingAddressResponse;
  boundingbox: [ string, string, string, string ]
}

export type SearchFormState =
  | { ok: true; data: {name: string; lat: number; lon: number}[] }
  | { ok: true; data: null}
  | FormError

//Map Window
export type lngLatEvent = {
  lngLat :{
    lat:number,
    lng:number,
  }
}

  //Common Types
export type ButtonDeleteInputProps = {
    id?:number;
    entity:ENTITIES;
    onUpdate: () => void;
}

export type deleteProp = {
    action: (id:number) => Promise<void>,
    msg: string,
    className: string,
    btnMsg:string
}