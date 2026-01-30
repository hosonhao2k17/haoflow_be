import { EmailField, PasswordField } from "src/decorators/field.decorator";


export class LoginDto {

    @EmailField()
    email: string;

    @PasswordField()
    password: string;
}