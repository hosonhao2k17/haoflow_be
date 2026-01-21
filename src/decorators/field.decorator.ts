import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength, NotEquals, ValidationOptions } from "class-validator";
import { IStringFieldOptions } from "src/common/interfaces/field.interface";
import { IsNullable } from "./validators/is-nullable.decorator";
import { ToLowerCase, ToUpperCase } from "./transform.decorator";
import { applyDecorators } from "@nestjs/common";


export function StringField(
    options: IStringFieldOptions
) {
    
    const decorators = [Type(() => String), IsString({each: options.each})] 

    if(options.nullable) {
        decorators.push(IsNullable({each: options.each}))
    } else {
        decorators.push(IsNotEmpty({each: options.each}))
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
