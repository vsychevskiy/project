import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ACCESS_TOKEN_CONST } from '../config';
import randToken = require('rand-token');
import { AccessToken } from '../entities/access-token.entity';

@Injectable()
export class AccessTokenService {
  constructor(
    @InjectModel(AccessToken) private accessTokenRepository: typeof AccessToken
  ) { }

  public async createAccessToken(
    isVerified: boolean = true,
    id: string,
  ): Promise<any> {
    await this.accessTokenRepository.update(
      { isVerified: false },
      { where: { user: id } },
    );
    const dataToCreate = {
      id: randToken.uid(ACCESS_TOKEN_CONST.SIZE),
      user: id,
      isVerified,
      created: new Date(),
      validToDate: new Date(new Date().getTime() + ACCESS_TOKEN_CONST.TTL),
    }
    return await this.accessTokenRepository.create<AccessToken>(dataToCreate);
  }

  public async findOne(options: Object): Promise<AccessToken> {
    return await this.accessTokenRepository.findOne<AccessToken>(options);
  }
}
