import { StringField } from "src/decorators/field.decorator";


export class AiDto<T> {

    @StringField()
    module: string;
    
    @StringField()
    message: string;

    @StringField()
    typeString?: string;

    data: T
}