import { StringField } from "src/decorators/field.decorator";



export class AiAgentDto {

    @StringField()
    message: string;
}