import { Body, Controller, Post } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { AiAgentDto } from './dto/ai-agent.dto';
import { ApiEndpoint } from 'src/decorators/http.decorator';
import { Action, Subject } from 'src/decorators/permission.decorator';
import { PermissionAction, PermissionSubject } from 'src/common/constants/app.constant';

@Controller('ai-agent')
@Subject(PermissionSubject.AI)
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @Post() 
  @ApiEndpoint()
  @Action(PermissionAction.CREATE)
  chat(@Body() dto: AiAgentDto) {
    return this.aiAgentService.chat(dto.message)
  }
}
