import {
  Module,
  forwardRef,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../entities/user.entity';
import { AppModule } from '../../app.module';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserAuthService } from './services/user-auth.service';

@Module({
  imports: [
    forwardRef(() => AppModule),
    SequelizeModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserAuthService
  ],
  exports: [
    UserService
  ],
})
export class UserModule {
}
