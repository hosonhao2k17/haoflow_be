import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';

@Module({
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}
