import { NumberField, StringField, UuidField } from "src/decorators/field.decorator";


export class AlertThresholdDto {

    @UuidField()
    id: string;
    
    @StringField()
    categoryTitle: string;

    @NumberField({
        min: 0,
        max: 100 
    })
    percentage: number;
}