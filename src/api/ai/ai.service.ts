import { GenerateContentResponse, GoogleGenAI, Part } from '@google/genai';
import { Inject, Injectable } from '@nestjs/common';
import { AI } from 'src/common/constants/app.constant';
import { AiDto } from './dto/ai.dto';
import { TaskRdo } from '../tasks/rdo/task.rdo';
import { aiRules } from 'src/common/constants/rule.constant';
import { AiRdo } from './rdo/ai.rdo';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {

    constructor(
        @Inject(AI) private readonly aiClient: GoogleGenAI,
        private configService: ConfigService
    ) {}

    async generateAiContent(dto: AiDto<any>, parts: Part[] = []): Promise<GenerateContentResponse> {
        parts.push({
            text: JSON.stringify({
                rules: aiRules.join(),
                ...dto
            })
        });

        return this.aiClient.models.generateContent({
            model: this.configService.getOrThrow<string>('AI_MODEL'),
            contents: [{ role: "user", parts }]
        });
    }

    async handleImage(imageUrl: string): Promise<Part> {
        return {
            fileData: {
                mimeType: imageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg',
                fileUri: imageUrl
            }
        };
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

    extractText(response: GenerateContentResponse): string {
        return response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    }

    extractJson<T>(response: GenerateContentResponse): AiRdo<T> {
        const text = this.extractText(response);
        const clean = text.replace(/```json|```/g, '').trim();
        return JSON.parse(clean) as AiRdo<T>;
    }
}
