import { Transform, TransformFnParams } from "class-transformer";



export function ToLowerCase(): PropertyDecorator {
    return Transform(
        (params: TransformFnParams) => {
            const {value} = params;

            if(value === null || value === undefined) {
                return value;
            }
            if(!Array.isArray(value)) {
                return value.toLowerCase()
            }

            return value.map((item) => item.toLowerCase())
        },
        {
            toClassOnly: true
        }
    )
}

export function ToUpperCase(): PropertyDecorator {
    return Transform(
        (params: TransformFnParams) => {
            const {value} = params;
            if(value === null || value === undefined) {
                return;
            }
            if(!Array.isArray(value)) {
                return value.toUpperCase()
            }

            return value.map((item) => item.toUpperCase())
        },
        {
            toClassOnly: true
        }
    )
}