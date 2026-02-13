import { UuidField } from "src/decorators/field.decorator";
import { UpdateUserDto } from "./update-user.dto";


export class UpdateMultiUserDto extends UpdateUserDto {

    @UuidField({each: true})
    ids: string[]
}