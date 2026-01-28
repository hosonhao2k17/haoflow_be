import { Gender, UserStatus } from "src/common/constants/app.constant";
import { EmailField, EnumField, StringField, UuidField } from "src/decorators/field.decorator";


export class FilterUserDto {

    @EnumField(UserStatus, {options: true})
    status?: UserStatus;

    @EnumField(Gender,{options: true})
    gender?: Gender;

    @StringField({options: true})
    fullName?: string;

    @EmailField({options: true})
    email?: string;

    @StringField({options: true})
    createdBy?: string;

    @StringField({options: true})
    updatedBy?: string
}