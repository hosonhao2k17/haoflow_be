import { ApiPropertyOptions } from "@nestjs/swagger";


export interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
    options?: boolean;
}

export interface IStringFieldOptions extends IFieldOptions {
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
    swaggerOptions?:  ApiPropertyOptions
} 

export interface INumberFieldOptions extends IFieldOptions {
    min?: number;
    max?: number;
    int?: boolean;
    swaggerOptions?:  ApiPropertyOptions
}