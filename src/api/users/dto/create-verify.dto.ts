import { BooleanField, DateField, StringField, UuidField } from "src/decorators/field.decorator";




export class CreateVerifyDto {
    
    @UuidField()
    userId: string;

    @StringField()
    token: string;

    @DateField()
    expiresAt: Date;

    @BooleanField({options: true})
    used?: boolean;
}