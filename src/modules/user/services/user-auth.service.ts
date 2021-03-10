import {
  Injectable,
  BadRequestException, NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { nanoid } from 'nanoid'
import * as bcrypt from 'bcryptjs';
import { User } from '../../../entities/user.entity';
import { AccessTokenService } from '../../../services/access-token.service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/user-sign-up.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    @InjectModel(User) private userRepository: typeof User
  ) { }

  public async signUp(userData: SignUpDto): Promise<any> {
    const checkUser = await this.userRepository.findOne<User>({ where: { email: userData.email } });

    if (!checkUser) {
      const user = await this.userRepository.create({
        id: nanoid(),
        passwordHash: await bcrypt.hashSync(userData.password),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role
      });
      const accessToken = await this.accessTokenService.createAccessToken(
        true,
        user.id,
      );

      return {
        accessToken: accessToken.id,
        user: user
      };
    } else {
      throw new BadRequestException('User with this email already exist')
    }
  }

  public async signIn(signInData: SignInDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: signInData.email } });
    if (user && (await bcrypt.compareSync(signInData.password, user.passwordHash))) {
      const accessToken = await this.accessTokenService.createAccessToken(
        true,
        user.id,
      );

      return {
        accessToken: accessToken.id,
        user: user
      };
    } else {
      throw new NotFoundException('User with this credentials not found')
    }
  }

  public async forgotPassword(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      const newPassword = generatePassword(10);
      user.passwordHash = await bcrypt.hashSync(newPassword),
      await user.save();
      return {
        message: `Your new password: ${newPassword}`
      }
    } else {
      throw new NotFoundException('This email does not match any user')
    }
  }
}

const generatePassword = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
