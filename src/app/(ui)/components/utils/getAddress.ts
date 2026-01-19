import { NominatingAddressResponse } from "../../types/types";

export function getAddress(address: NominatingAddressResponse): string {
  const road = address.road || "";
  const number = address.house_number ? `, ${address.house_number}` : "";
  
  const streetPart = road ? `${road}${number}` : "";

  const suburb = address.suburb || address.neighbourhood || address.city_district || "";
  const suburbPart = suburb ? (streetPart ? ` - ${suburb}` : suburb) : "";

  const city = address.city || address.municipality || address.village || "";
  const cityPart = city ? ((streetPart || suburbPart) ? `, ${city}` : city) : "";

  const state = address.state ? ` - ${address.state}` : "";

  return `${streetPart}${suburbPart}${cityPart}${state}`.replace(/^[\s, -]+/, '');
}