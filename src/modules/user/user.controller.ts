import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from '../../interfaces';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/user-sign-up.dto';
import { UserAuthService } from './services/user-auth.service';
import { UserService } from './services/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
  ) { }

  @Post('sign-up')
  public async signUp(
    @Body() createUserDto: SignUpDto,
  ): Promise<IUser> {
    return await this.userAuthService.signUp(createUserDto);
  }

  @Post('sign-in')
  public async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<IUser> {
    return await this.userAuthService.signIn(signInDto);
  }

  @Post('forgot-password')
  public async forgotPassword(
    @Body() data: ForgotPasswordDto,
  ): Promise<IUser> {
    return await this.userAuthService.forgotPassword(data.email);
  }
}
