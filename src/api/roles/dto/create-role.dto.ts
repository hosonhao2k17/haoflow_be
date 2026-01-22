import { StringField } from "src/decorators/field.decorator";

export class CreateRoleDto {

    @StringField()
    name: string;

    @StringField()
    title: string;
}
