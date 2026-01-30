import { compare, hash } from "bcrypt";


export const hashPassword = async (password: string): Promise<string> => {
    return hash(password, 10);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return compare(password, hash)
}