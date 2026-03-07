import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { Socket } from "socket.io";
import { AuthService } from "src/api/auth/auth.service";


@Injectable()
export class WsAuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const client: Socket = context.switchToWs().getClient();
        const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];

        if(!token) {
            throw new WsException("Unauthorized")
        }

        try {
            const payload = this.authService.verifyAccessToken(token);
            client.data.user = payload
            return true;
        } catch (error) {
            throw new WsException('Invalid token')
        }
    }

} 