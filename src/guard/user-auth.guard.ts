import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenService } from '../services/access-token.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly accessTokenService: AccessTokenService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: any = context.switchToHttp().getRequest();
      const bearerToken: any = request.headers.authorization.split(' ')[1];
      if (bearerToken) {
        const token: any = await this.accessTokenService.findOne({where: {
          id: bearerToken,
        }});
        if (token && token.user) {
          return true;
        }
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
