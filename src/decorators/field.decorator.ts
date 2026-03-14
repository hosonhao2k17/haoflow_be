import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import {IsBoolean, IsDate, IsEmail, IsEnum, IsInt,IsMilitaryTime, IsOptional, IsString, IsStrongPassword,IsUrl, IsUUID, Max, MaxLength, Min, MinLength, NotEquals,} from "class-validator";
import {IBooleanFiledOptions, IDateFieldOptions, IEmailFieldOptions,IEnumFieldOptions, IExposeFieldOptions, IFieldOptions, IMilitaryTimeOptions, INumberFieldOptions, IPasswordFieldOptions, IStringFieldOptions, IurlFieldOptions, IUuidFieldOptions,} from "src/common/interfaces/field.interface";
import { IsNullable } from "./validators/is-nullable.decorator";
import { ToBoolean, ToLowerCase, ToUpperCase } from "./transform.decorator";
import { applyDecorators } from "@nestjs/common";
import { ErrorCode } from "src/common/constants/error-code.constant";

export function buildDecorator(
    options: IFieldOptions = {},
    type: ApiPropertyOptions['type']
): PropertyDecorator[] {
    const decorators: PropertyDecorator[] = [];

    // Optional
    if (options.options) {
        decorators.push(IsOptional({ each: options.each }));
    }

    // Nullable
    decorators.push(
        options.nullable
            ? IsNullable({ each: options.each })
            : NotEquals(null, { each: options.each })
    );

    // Swagger
    if (options.swagger !== false) {
        const { swaggerOptions } = options;
        if (options.options) {
            decorators.push(
                ApiPropertyOptional({ type, ...swaggerOptions, isArray: options.each } as ApiPropertyOptions)
            );
        }
        decorators.push(
            ApiProperty({ type, ...swaggerOptions, isArray: options.each } as ApiPropertyOptions)
        );
    }

    return decorators;
}

export function StringField(options: IStringFieldOptions = {}) {
    const decorators: PropertyDecorator[] = [
        Type(() => String),
        IsString({ each: options.each, message: ErrorCode.STRING }),
        ...buildDecorator(options, String),
        MinLength(options.minLength ?? 1, { message: ErrorCode.STRING_MIN_LENGTH, each: options.each }),
    ];

    if (options.maxLength)   decorators.push(MaxLength(options.maxLength, { message: ErrorCode.STRING_MAX_LENGTH, each: options.each }));
    if (options.toLowerCase) decorators.push(ToLowerCase());
    if (options.toUpperCase) decorators.push(ToUpperCase());

    return applyDecorators(...decorators);
}

export function NumberField(options: INumberFieldOptions = {}) {
    const decorators: PropertyDecorator[] = [
        Type(() => Number),
        ...buildDecorator(options, Number),
    ];

    if (options.min) decorators.push(Min(options.min, { message: ErrorCode.NUMBER_MIN }));
    if (options.max) decorators.push(Max(options.max, { message: ErrorCode.NUMBER_MAX }));
    if (options.int) decorators.push(IsInt({ each: options.each }));

    return applyDecorators(...decorators);
}

export function EnumField(entity: object, options: IEnumFieldOptions = {}) {
    const decorators: PropertyDecorator[] = [
        IsEnum(entity, { each: options.each, message: ErrorCode.ENUM }),
        ...buildDecorator(options, String),
    ];

    return applyDecorators(...decorators);
}

export function EmailField(options: IEmailFieldOptions = {}) {
    const decorators: PropertyDecorator[] = [
        IsEmail({}, { each: options.each }),
        ...buildDecorator(options, String),
    ];

    return applyDecorators(...decorators);
}

export function UrlField(options: IurlFieldOptions = {}) {
    const decorators: PropertyDecorator[] = [
        IsUrl({}, { each: options.each }),
        ...buildDecorator(options, String),
    ];

    return applyDecorators(...decorators);
}

export function PasswordField(options: IPasswordFieldOptions = {}) {
    const decorators: PropertyDecorator[] = [
        IsStrongPassword({}, { each: options.each }),
        ...buildDecorator(options, String),
    ];

    return applyDecorators(...decorators);
}

export function UuidField(options: IUuidFieldOptions = {}) {
    const decorators: PropertyDecorator[] = [
        IsUUID(4, { each: options.each }),
        ...buildDecorator(options, String),
    ];

    return applyDecorators(...decorators);
}

export function DateField(options: IDateFieldOptions = {}) {
    const decorators: PropertyDecorator[] = [
        IsDate({ each: options.each }),
        Type(() => Date),
        ...buildDecorator(options, String),
    ];

    return applyDecorators(...decorators);
}

export function BooleanField(options: IBooleanFiledOptions = {}) {
    const decorators: PropertyDecorator[] = [
        ToBoolean,
        IsBoolean({ each: options.each }),
        ...buildDecorator(options, Boolean),
    ];

    return applyDecorators(...decorators);
}

export function MilitaryTimeField(options: IMilitaryTimeOptions = {}) {
    const decorators: PropertyDecorator[] = [
        IsMilitaryTime({ each: options.each }),
        ...buildDecorator(options, String),
    ];

    return applyDecorators(...decorators);
}


export function ExposeField(options: IExposeFieldOptions = {}) {
    const { classType, swaggerOptions } = options;

    const decorators: any[] = [
        Expose(),
        ApiProperty(swaggerOptions)
    ];

    if (classType) {
        decorators.push(Type(classType));
    }

    return applyDecorators(...decorators);
}