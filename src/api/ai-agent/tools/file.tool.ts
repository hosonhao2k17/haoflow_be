import { tool } from "@langchain/core/tools";
import * as fs from 'fs/promises';
import path from "path";
import z from "zod";



export const readFileTool = tool(
    async ({ filePath }) => {
        const content = await fs.readFile(filePath, 'utf-8')
        return content
    },
    {
        name: 'read_file',
        description: "Đọc nội dung 1 file trong dự án",
        schema: z.object({
            filePath: z.string().describe('Đường dẫn tới file cần đọc')
        })
    }
)

export const writeFileTool = tool(
    async ({filePath, content}) => {
        await fs.mkdir(path.dirname(filePath), {recursive: true});
        await fs.writeFile(filePath, content,'utf-8');
        return `Đã ghi file: ${filePath}`
    },
    {
        name: 'write_file',
        description: "Tạo hay chỉnh sửa 1 file",
        schema: z.object({
            filePath: z.string().describe('Đường dẫn file'),
            content: z.string().describe('Nội dung cần ghi'),
        }),
    }
)

export const listFilesTool = tool(
    async ({ directory }) => {
        const IGNORE = new Set(['.git', 'node_modules', 'dist', '.next']);
        const results: string[] = [];
        const walk = async (dir: string) => {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                if (IGNORE.has(entry.name)) continue;
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) await walk(fullPath);
                else results.push(fullPath);
            }
        };

        await walk(directory);
        return results.join('\n');
    },
    {
        name: 'list_files',
        description: 'Liệt kê toàn bộ file trong thư mục dự án',
        schema: z.object({
        directory: z.string().describe('Thư mục cần liệt kê').default('.'),
        }),
    },
);