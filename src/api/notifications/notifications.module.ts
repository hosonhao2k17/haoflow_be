import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationConsumer } from './notifications.consumer';
import { BullModule } from '@nestjs/bullmq';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    BullModule.registerQueue({
      name: 'notifications'
    }),
    GatewayModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationConsumer],
})
export class NotificationsModule {}
