import { IsEnum } from "class-validator";
import { RoleStatus } from "src/common/constants/status.constant";
import { StringField } from "src/decorators/field.decorator";

export class CreateRoleDto {

    @StringField()
    name: string;

    @StringField()
    title: string;

    @IsEnum(RoleStatus)
    status: RoleStatus;
}
