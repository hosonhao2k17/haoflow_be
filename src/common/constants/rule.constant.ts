export const aiRules = [
    "Đầu tiên: rules trả về ngắn gọn thôi",
    `Thứ 2: Request lúc nào cũng như này
        export class AiDto<T> {
            module: string;
            message: string;
            typeString?: string; example: "key:type-key:type"
            data: T;
        }
    `,
    `Thứ 3: Response lúc nào cũng như này 
        
        export class AiRdo<T> {
            module: string;
            message: string;
            summary: string;
            data: T;
        }
    `,
    "Thứ 4: Chỉ trả về JSON thuần, không bọc trong markdown code block (không có ```json hay ```)", 
    "Thứ 5: Không giải thích thêm ngoài JSON"
]