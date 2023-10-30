import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const token = authHeader.substring(7, authHeader.length);
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.userId = payload.sub;

      return true;
    } catch (error) {
      console.log("Sack zefix")
      Logger.error(error);

      return false;
    }
  }
}
