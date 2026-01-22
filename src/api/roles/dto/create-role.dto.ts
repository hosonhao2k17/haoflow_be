import { IsEnum } from "class-validator";
import { RoleStatus } from "src/common/constants/status.constant";
import { EnumField, StringField } from "src/decorators/field.decorator";

export class CreateRoleDto {

    @StringField()
    name: string;

    @StringField()
    title: string;

    @EnumField(RoleStatus, {options: true})
    status?: RoleStatus;

    @StringField({options: true})
    description?: string;
}
