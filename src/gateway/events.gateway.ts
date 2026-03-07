import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, ConnectedSocket, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { WsAuthGuard } from 'src/guards/ws-auth.guard';

@WebSocketGateway({
  cors: {origin: '*'},
  namespace: '/'
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{


    @WebSocketServer()
    server: Server;

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


    @UseGuards(WsAuthGuard)
    @SubscribeMessage('send_message')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { to: string; message: string },
    ) {
        const fromUser = client.data.user;

        this.server.to(`user:${data.to}`).emit('receive_message', {
            from: fromUser.id,
            message: data.message,
            timestamp: new Date(),
        });
    }


    sendToUser(userId: string, event: string, data: any) {
        this.server.to(`user:${userId}`).emit(event, data);
    }
    
}