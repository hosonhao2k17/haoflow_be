import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, NotEquals, ValidationOptions } from "class-validator";
import { IEnumFieldOptions, INumberFieldOptions, IStringFieldOptions } from "src/common/interfaces/field.interface";
import { IsNullable } from "./validators/is-nullable.decorator";
import { ToLowerCase, ToUpperCase } from "./transform.decorator";
import { applyDecorators } from "@nestjs/common";


export function StringField(
    options: IStringFieldOptions = {}
) {
    
    const decorators = [Type(() => String), IsString({each: options.each})] 

    if(options.nullable) {
        decorators.push(IsNullable({each: options.each}))
    } else {
        decorators.push(NotEquals(null,{each: options.each}))
    }

    if(options.options) {
        decorators.push(IsOptional({each: options.each}))
    }
    if(options.swagger !== false) {
        const {swaggerOptions } = options
        decorators.push(
            ApiProperty({
                type: String,
                ...swaggerOptions,
                isArray: options.each
            })
        )
    }

    const minLength = options.minLength || 1;
    decorators.push(MinLength(minLength))
    if(options.maxLength) {
        decorators.push(MaxLength(options.maxLength))
    }

    if(options.toLowerCase) {
        decorators.push(ToLowerCase())
    }
    if(options.toUpperCase){
        decorators.push(ToUpperCase())
    }

    return applyDecorators(...decorators)
}


export function NumberField(options: INumberFieldOptions = {}) {
    const decorators = [Type(() => Number)];

    if(options.nullable) {
        decorators.push(IsNullable({each: options.each}))
    } else {
        decorators.push(NotEquals(null,{each: options.each}))
    }

    if(options.options) {
        decorators.push(IsOptional({each: options.each}))
    }

    if(options.swagger !==  false) {
        const {swaggerOptions} = options;
        decorators.push(ApiProperty({
            type: Number,
            ...swaggerOptions,
            isArray: options.each
        }));
    }

    if(options.min) {
        decorators.push(Min(options.min))
    }
    if(options.max) {
        decorators.push(Max(options.max))
    }

    if(options.int) {
        decorators.push(IsInt({each: options.each}))
    }

    return applyDecorators(...decorators)
}

export function EnumField(entity: object, options: IEnumFieldOptions = {} ) {
    const decorators = [IsEnum(entity, {each: options.each})];

    if(options.nullable) {
        decorators.push(IsNullable({each: options.each}))
    } else {
        decorators.push(NotEquals(null, {each: options.each}))
    }

    if(options.options) {
        decorators.push(IsOptional({each: options.each}))
    }

    if(options.swagger !== false) {
        const {swaggerOptions} = options;
        decorators.push(
            ApiProperty({
                enum: entity,
                ...swaggerOptions,
                isArray: options.each
            })
        )
    }

    return applyDecorators(...decorators)
}