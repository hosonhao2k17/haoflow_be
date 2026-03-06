import { StringField, UuidField } from "src/decorators/field.decorator";



export class SuggestTaskDto {

    @StringField()
    prompt: string;

}