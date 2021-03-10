import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './services/config/config.services';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccessToken } from './entities/access-token.entity';
import { ProductModule } from './modules/product/product.module';
import { AccessTokenService } from './services/access-token.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test2',
      synchronize: true,
      autoLoadModels: true,
      define: {
        timestamps: false
      },
    }),
    UserModule,
    ProductModule,
    SequelizeModule.forFeature([AccessToken])
  ],
  controllers: [],
  providers: [ConfigService, AccessTokenService],
  exports: [
    UserModule,
    ProductModule,
    ConfigService,
    AccessTokenService
  ]
})
export class AppModule {}
