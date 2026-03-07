import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/api/auth/auth.service';
import { PayloadType } from 'src/api/auth/types/payload.type';

@Injectable()
export class GatewayService {

    // Map<userId, Set<socketId>> — 1 user có thể mở nhiều tab
    private connections = new Map<string, Set<string>>();

    constructor(private authService: AuthService) {}


    async getCurrentUserFromSocket(client: Socket) :Promise<null | PayloadType> {
        const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
        if(!token) {
            return null
        }

        try {
            return await this.authService.verifyAccessToken(token)
        } catch {
            return null
        }
    }

    addConnection(userId: string, socketId: string) {
        if(!this.connections.has(userId)) {
            this.connections.set(userId, new Set())
        }
        this.connections.get(userId)?.add(socketId)
    }

    removeConnection(userId: string, socketId: string) {
        this.connections.get(userId)?.delete(socketId);
        if (this.connections.get(userId)?.size === 0) {
            this.connections.delete(userId);
        }
    }


    isUserOnline(userId: string): boolean {
        return (this.connections.get(userId)?.size ?? 0) > 0;
    }

    getOnlineUsers(): string[] {
        return [...this.connections.keys()];
    }

}
