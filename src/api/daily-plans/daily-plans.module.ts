import { Module } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { DailyPlansController } from './daily-plans.controller';

@Module({
  controllers: [DailyPlansController],
  providers: [DailyPlansService],
})
export class DailyPlansModule {}
