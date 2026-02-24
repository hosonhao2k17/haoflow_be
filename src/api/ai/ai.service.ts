import { GenerateContentResponse, GoogleGenAI } from '@google/genai';
import { Inject, Injectable } from '@nestjs/common';
import { AI } from 'src/common/constants/app.constant';
import { AiDto } from './dto/ai.dto';
import { TaskRdo } from '../tasks/rdo/task.rdo';
import { aiRules } from 'src/common/constants/rule.constant';

@Injectable()
export class AiService {

    constructor(
        @Inject(AI) private readonly aiClient: GoogleGenAI
    ) {}

    generateAiContent(dto: AiDto<any>) :Promise<GenerateContentResponse>  {
        return this.aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {role: "user", parts: [{text: JSON.stringify(
                    {
                        rules: aiRules.join(),
                        ...dto
                    }
                )}]}
            ]
        })
    }

    async generateSuggestTask(currentTask: TaskRdo, recentTasks: TaskRdo[]) {

        const message = `
            Dựa vào currentTask và recentTasks hãy phân tích currentTask mà tôi vừa tạo
            là có hợp lý hay chưa và trả về response json đã đánh giá sau đây ${Object.entries(TaskRdo)}
        `

        const res = await this.generateAiContent({
            module: "task",
            message,
            data: {
                currentTask,
                recentTasks
            }
        });
        return res.text
    }
}
