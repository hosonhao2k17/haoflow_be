import { ErrorCode } from "src/common/constants/error-code.constant";


export const IsErroCode = (val: unknown) =>{
    return Object.values(ErrorCode).includes(val as ErrorCode)
}