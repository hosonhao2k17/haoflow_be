import { ApiPropertyOptions } from "@nestjs/swagger";


export interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
    options?: boolean;
    swaggerOptions?:  ApiPropertyOptions
}

export interface IStringFieldOptions extends IFieldOptions {
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
    
} 

export interface INumberFieldOptions extends IFieldOptions {
    min?: number;
    max?: number;
    int?: boolean;
}

export interface IEnumFieldOptions extends IFieldOptions {

}

export interface IEmailFieldOptions extends IFieldOptions {
    
}

export interface IurlFieldOptions extends IFieldOptions {
    
}

export interface IPasswordFieldOptions extends IFieldOptions {
    
}

export interface IUuidFieldOptions extends IFieldOptions {
    
}

export interface IDateFieldOptions extends IFieldOptions {
    
}

export interface IBooleanFiledOptions extends IFieldOptions {
    
}

export interface IMilitaryTimeOptions extends IFieldOptions {

}