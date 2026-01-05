import { COORTYPE } from "@/src/app/(ui)/types/enums";
import { Borders, LIMITS } from "@/src/app/(ui)/types/types";

export function bBoxToBorders(boundingbox: [string, string, string, string]): Borders{ 
    const south = parseAndValidateCoord(boundingbox[0], COORTYPE.LAT);
    const north = parseAndValidateCoord(boundingbox[1], COORTYPE.LAT);
    const west  = parseAndValidateCoord(boundingbox[2], COORTYPE.LONG);
    const east  = parseAndValidateCoord(boundingbox[3], COORTYPE.LONG);

    if (south > north) {
        throw new Error("BBox inconsistente: A latitude Sul é maior que a Norte.");
    }

    return {
    sw: { longitude: west, latitude: south},
    ne: { longitude: east, latitude: north},
    }
}

export function parseAndValidateCoord(value: string, type: COORTYPE): number {
    if (typeof value !== "string") {
      throw new Error("Coordinate must be a string.");
    }

    const trimmed = value.trim();
    
    if (!trimmed) {
      throw new Error(`Missing ${type} coordinate.`);
    }   
    
    const num = Number(trimmed);
    
    if (!Number.isFinite(num)) {
      throw new Error(`Invalid ${type} coordinate: not a number ("${value}").`);
    }   
    
    const { min, max } = LIMITS[type];
    
    if (num < min || num > max) {
      throw new Error(
        `Invalid ${type} coordinate: ${num} out of range [${min}, ${max}].`
      );
    }

    return num; 
}