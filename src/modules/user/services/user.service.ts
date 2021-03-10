import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUser } from '../../../interfaces';
import { User } from '../../../entities/user.entity';

@Injectable()
export class UserService  {
  constructor(
    @InjectModel(User) private userRepository: typeof User
    ) { }

  public async findAll(): Promise<Array<User>> {
    return await this.userRepository.findAll<User>();
  }

  public async findOne(options: Object): Promise<User> {
    return await this.userRepository.findOne<User>(options);
  }

  public async create(user: any): Promise<User> {
    return await this.userRepository.create<User>(user)
  }

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id: id } });
  }

  public async update(id: string, newValue: any): Promise<User> {
    let user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User with such id not found')
    }

    user = this._assign(user, newValue);
    return await user.save();
  };

  public async delete(id: string): Promise<any> {
    await this.userRepository.destroy({
      where: { id }
    });
    return {
      message: 'success'
    }
  }

  private _assign(user: any, newValue: IUser): User {
    for (const key of Object.keys(user.dataValues)) {
      if (user[key] !== newValue[key]) user[key] = newValue[key];
    }

    return user as User;
  }
}