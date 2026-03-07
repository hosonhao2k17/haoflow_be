import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect{
    
    private logger = new Logger(NotificationGateway.name);


    handleConnection(client: Socket) {
        this.logger.log(`client connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`client disconnected: ${client.id}`)
    }


    
}