import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/user/services/user.service';
import { AccessTokenService } from 'src/services/access-token.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly accessTokenService: AccessTokenService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: any = context.switchToHttp().getRequest();
      const bearerToken: any = request.headers.authorization.split(' ')[1];
      if (bearerToken) {
        const token: any = await this.accessTokenService.findOne({
          where: {
            id: bearerToken,
          }
        });
        if (token && token.user) {
          const user: any = await this.userService.findById(token.user);
          if (user.role == 'admin') {
            return true;
          }
        }
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
