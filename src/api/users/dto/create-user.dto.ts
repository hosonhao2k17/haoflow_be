import { Gender, RoleName, UserStatus } from "src/common/constants/app.constant";
import { DateField, EmailField, EnumField, PasswordField, StringField, UrlField, UuidField } from "src/decorators/field.decorator";

export class CreateUserDto {

    @StringField()
    fullName: string;

    @EmailField()
    email: string;

    @UrlField({options: true})
    avatar?: string;

    @PasswordField()
    password: string;

    @EnumField(Gender,{options: true})
    gender?: Gender;

    @EnumField(UserStatus,{options: true})
    status?: UserStatus;

    @EnumField(RoleName)
    roleName: RoleName

    @DateField({options: true})
    birthDate?: Date;
}
