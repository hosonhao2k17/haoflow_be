
import { ExposeField } from "src/decorators/field.decorator";


export class LoginRdo {

    @ExposeField()
    userId: string;

    @ExposeField()
    accessToken: string;

    @ExposeField()
    refreshToken: string;

    @ExposeField()
    expiresIn: string;

}