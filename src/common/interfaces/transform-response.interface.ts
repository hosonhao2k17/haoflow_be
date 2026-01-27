

export interface ITransformResponse<T> {
    data: T;
    message: string;
    statusCode: number;
}