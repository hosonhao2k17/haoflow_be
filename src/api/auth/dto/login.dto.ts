import { ApiProperty } from "@nestjs/swagger";
import { EmailField, PasswordField } from "src/decorators/field.decorator";


export class LoginDto {

    @EmailField()
    @ApiProperty({
        example: 'hosonhao23052004@gmail.com'
    })
    email: string;

    @PasswordField()
    @ApiProperty({
        example: 'Sonhao@20045@'
    })
    password: string;
}