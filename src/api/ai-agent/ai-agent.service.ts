import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { createAgent } from 'langchain';
import { HumanMessage } from '@langchain/core/messages';
import { readFileTool, writeFileTool, listFilesTool } from './tools/file.tool';
import { runTerminalTool } from './tools/terminal.tool';
import { searchCodeTool } from './tools/search.tool';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiAgentService implements OnModuleInit {
    private agent: any;

    constructor(private configService: ConfigService) {

    }

    async onModuleInit() {
        const llm = new ChatGoogleGenerativeAI({
            model: this.configService.getOrThrow('AI_MODEL'),
            apiKey: this.configService.getOrThrow('AI_API_KEY'),
            temperature: 0,
        });

        const tools = [
            readFileTool,
            writeFileTool,
            listFilesTool,
            runTerminalTool,
            searchCodeTool,
        ];

        this.agent = createAgent({
            model: llm,
            tools,
            systemPrompt: `Bạn là AI assistant chuyên về NestJS.
                Hãy giúp user thao tác với code dự án một cách cẩn thận.
                Luôn đọc file trước khi chỉnh sửa.`,
        });
    }

    async chat(input: string): Promise<string> {
        const result = await this.agent.invoke({
            messages: [new HumanMessage(input)],
        });

        const messages = result.messages;
        const lastMessage = messages[messages.length - 1];
        return lastMessage.content as string;
    }
}