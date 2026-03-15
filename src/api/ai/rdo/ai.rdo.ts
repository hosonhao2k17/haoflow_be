import { ExposeField } from "src/decorators/field.decorator";

export class AiRdo<T> {

    @ExposeField()
    module: string;

    @ExposeField()
    message: string;

    @ExposeField()
    summary: string;

    @ExposeField()
    data: T;
}