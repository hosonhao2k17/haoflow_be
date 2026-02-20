import { Gender, RoleName, UserStatus } from "src/common/constants/app.constant";
import { BooleanField, DateField, EmailField, EnumField, PasswordField, StringField, UrlField, UuidField } from "src/decorators/field.decorator";

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

    @BooleanField({options: true})
    verified?: boolean

    @UuidField()
    roleId: string;

    @DateField({options: true})
    birthDate?: Date;
}
