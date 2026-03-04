import { StringField } from "src/decorators/field.decorator";



export class TestDto {

    @StringField()
    imageUrl: string;
}