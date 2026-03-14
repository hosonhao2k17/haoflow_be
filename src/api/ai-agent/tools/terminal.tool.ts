import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const ALLOWED_COMMANDS = ['npm', 'npx', 'node', 'nest', 'git', 'ls', 'cat', 'echo'];

export const runTerminalTool = tool(
    async ({ command }) => {
        const base = command.trim().split(' ')[0];
        if (!ALLOWED_COMMANDS.includes(base)) {
            return `Lệnh "${base}" không được phép chạy.`;
        }

        try {
        const { stdout, stderr } = await execAsync(command, { timeout: 15000 });
            return stdout || stderr || 'Lệnh chạy thành công (không có output)';
        } catch (err: any) {
            return `Lỗi: ${err.message}`;
        }
    },
    {
        name: 'run_terminal',
        description: 'Chạy lệnh terminal trong dự án NestJS (npm, git, nest...)',
        schema: z.object({
            command: z.string().describe('Lệnh cần chạy'),
        }),
    },
);