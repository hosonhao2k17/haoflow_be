import { StringField } from "src/decorators/field.decorator";



export class VerifyDto {

    @StringField()
    token: string;
    
}