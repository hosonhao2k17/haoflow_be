
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const searchCodeTool = tool(
  async ({ keyword, directory }) => {
    const { stdout } = await execAsync(
      `grep -rn "${keyword}" ${directory} --include="*.ts" --include="*.json"`,
    );
    return stdout || 'Không tìm thấy kết quả';
  },
  {
    name: 'search_code',
    description: 'Tìm kiếm keyword trong toàn bộ file .ts và .json của dự án',
    schema: z.object({
      keyword: z.string().describe('Từ khóa cần tìm'),
      directory: z.string().describe('Thư mục tìm kiếm').default('./src'),
    }),
  },
);