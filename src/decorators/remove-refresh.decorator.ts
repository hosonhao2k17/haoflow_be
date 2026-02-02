import { SetMetadata } from "@nestjs/common";
import { REMOVE_REFRESH_TOKEN } from "src/common/constants/app.constant";



export const RemoveRefresh = () => SetMetadata(REMOVE_REFRESH_TOKEN,true)