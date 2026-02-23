import { UuidField } from "src/decorators/field.decorator";



export class RemoveMultiTaskDto {

    @UuidField({each: true})
    ids: string[];
}