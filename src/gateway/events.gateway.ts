import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';

@WebSocketGateway({
  cors: {origin: '*'},
  namespace: '/'
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{

    private logger = new Logger(EventsGateway.name);

    constructor(private gatewayService: GatewayService) {}


    async handleConnection(client: Socket) {
        this.logger.log(`client connected: ${client.id}`);

        const user = await this.gatewayService.getCurrentUserFromSocket(client);
        if(!user) {
            client.disconnect()
            return;
        }

        client.join(`user:${user.id}`);
        client.data.user = user;

        this.gatewayService.addConnection(user.id, client.id)
        this.logger.log(`client connected: ${client.id} | User: ${user.id}`);
    }

    handleDisconnect(client: Socket) {
        const userId = client.data.user?.id;
        if (userId) {
            this.gatewayService.removeConnection(userId, client.id);
            this.logger.log(`Client disconnected: ${client.id} | User: ${userId}`);
        }
    }


    
}