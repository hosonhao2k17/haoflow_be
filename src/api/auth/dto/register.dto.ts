import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "src/api/users/dto/create-user.dto";


export class RegisterDto extends OmitType(CreateUserDto, ['roleId','status','avatar']) {

}