import { hash } from "bcrypt";


export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password, 10);
}