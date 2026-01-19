import { FormError } from "../../types/types";

export function toFormError(error: string): FormError{
  return {ok: false, error};
}
