import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AI } from 'src/common/constants/app.constant';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { AiController } from './ai.controller';

@Module({
  providers: [
    AiService,
    {
      provide: AI,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {

        return new GoogleGenAI({
          apiKey: configService.get('AI_API_KEY')
        })
      }
    }
  ],
  controllers: [AiController],
  exports: [AiService]
})
export class AiModule {}
