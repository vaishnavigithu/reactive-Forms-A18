import { FormGroup } from "@angular/forms";

export function misMatchPassword(formGroup : FormGroup){

    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {mismatch : true};
}