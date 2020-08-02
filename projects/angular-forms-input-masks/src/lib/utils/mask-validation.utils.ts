import { AbstractControl, ValidationErrors } from "@angular/forms";

export function maskFormatValidator(masks: string | string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    if (Array.isArray(masks)) {
      if (
        !(masks as string[]).find(
          (mask) => mask.length === control.value.length
        )
      ) {
        return { invalidLength: true };
      }
    } else {
      if (control.value.length !== masks.length) {
        return { invalidLength: true };
      }
    }

    return null;
  };
}