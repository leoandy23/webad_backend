import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const authToken = client.handshake.headers.authorization?.split(' ')[1];

    if (!authToken) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(authToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      context.switchToHttp().getRequest().user = payload;
      return true;
    } catch (error) {
      return false;
    }
  }
}
