'use server';

import { redirect } from "next/navigation";
import { FormState } from "@/src/app/(ui)/types/types";
import { editPOIs } from "@/src/app/api/points/[pointId]/service";
import { toFormError } from "../../common/toFormError";

export async function editPointAction(_: FormState, formData: FormData): Promise<FormState> {
  const mapId = Number(formData.get("mapId"));
  const pointId = Number(formData.get("pointId"));
  const pointName = formData.get("pointName");

  if (!pointId || typeof pointName !== "string" || pointName.trim().length === 0) {
    return toFormError("Nome inválido.");
  }

  if (pointName.trim().length > 35){
    return toFormError("O nome do ponto precisa ter 35 caracteres ou menos.")
  }

  try {
    await editPOIs(pointId,{name: pointName });
  } catch { return { ok: false, error: "Erro ao editar ponto." }}

  redirect(`/maps/${mapId}`);
}
