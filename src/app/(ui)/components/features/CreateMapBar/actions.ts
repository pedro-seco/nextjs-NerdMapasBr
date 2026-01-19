'use server';

import { createMap } from "@/src/app/api/maps/service"; 
import { toFormError } from "../../utils/toFormError";
import { CreateMapFormState } from "../../../types/types";
import { createMapBody } from "@/src/app/api/maps/types";
import { BRAZIL_DEFAULTS } from "../../config";


export async function createMapAction(_: CreateMapFormState, formData: FormData): Promise<CreateMapFormState> {
  const rawName = formData.get("mapName");
  const mapName = typeof rawName === 'string' ? rawName.trim() : '';
  
  if (mapName.length < 3) {
    return toFormError("O nome do mapa deve ter no mínimo 3 caracteres.");
  }

  try {
    const payload: createMapBody = {
      name: mapName,
      latitude: BRAZIL_DEFAULTS.latitude,
      longitude: BRAZIL_DEFAULTS.longitude,
      borders: BRAZIL_DEFAULTS.borders,
    };

    const createdMap = await createMap(payload);

    return {ok: true, data: createdMap}

  } catch (error) {
    console.error("Erro ao criar mapa:", error);
    return toFormError("Ocorreu um erro ao criar o mapa. Tente novamente.");
  }
}