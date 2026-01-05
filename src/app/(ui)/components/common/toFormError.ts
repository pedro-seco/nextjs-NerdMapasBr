import { FormState } from "../../types/types";

export function toFormError(error: string): FormState{
  return {ok: false, error};
}