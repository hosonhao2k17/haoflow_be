import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from "src/common/constants/app.constant";


export const Public = () => SetMetadata(PUBLIC_KEY, true)