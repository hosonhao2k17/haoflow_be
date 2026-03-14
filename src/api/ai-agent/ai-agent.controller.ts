import { Body, Controller, Post } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { AiAgentDto } from './dto/ai-agent.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ai-agent')
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @Post() 
  @ApiBearerAuth()
  chat(@Body() dto: AiAgentDto) {
    return this.aiAgentService.chat(dto.message)
  }
}
