import { DateField, StringField, UrlField } from "src/decorators/field.decorator";


export class CreateTaskCategoryDto {


    @StringField()
    title: string;

    @StringField({
        options: true
    })
    description?: string;

    @StringField({
        options: true
    })
    color?: string;

    @UrlField()
    icon?: string;


}
