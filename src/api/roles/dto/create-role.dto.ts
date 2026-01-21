import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {

    @IsString()
    @IsNumber()
    name: string;
}
