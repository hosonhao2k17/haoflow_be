import { Module } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { AiAgentController } from './ai-agent.controller';

@Module({
  controllers: [AiAgentController],
  providers: [AiAgentService],
})
export class AiAgentModule {}
