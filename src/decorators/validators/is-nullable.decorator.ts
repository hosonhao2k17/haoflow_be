import { ValidateIf, ValidationOptions } from "class-validator";



export function IsNullable(options?: ValidationOptions) {
    return ValidateIf((_obj, value) => value !== null, options);
}