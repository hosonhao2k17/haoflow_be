import { Provider } from "src/common/constants/provider.constant";
import { EnumField, UuidField } from "src/decorators/field.decorator";



export class CreateProviderDto {

    @EnumField(Provider)
    provider: Provider;

    @UuidField()
    providerId: string;

    @UuidField()
    userId: string;
}