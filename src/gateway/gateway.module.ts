import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/api/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [EventsGateway, GatewayService],
  exports: [EventsGateway]
})
export class GatewayModule {}
