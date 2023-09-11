import { UesrDto } from './dtos/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity.mysql';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findOne(name: string) {
    return this.userRepository.findOne({
      where: {
        username: name,
      },
    });
  }
  async getUser(name: string) {
    if (!(await this.isExistUser(name))) {
      return {
        code: 400,
        mes: 'user not exist',
      };
    }
    const user = await this.userRepository.findOne({
      where: {
        username: name,
      },
    });
    return {
      code: 200,
      mes: `find user ${user.username} success`,
    };
  }
  async createUser(user: UesrDto) {
    if (await this.isExistUser(user.username)) {
      return {
        code: 400,
        mes: 'user already exist',
      };
    }
    const res = await this.userRepository.save(user);
    console.log('res', res);

    return {
      code: 200,
      mes: 'create user success',
    };
  }
  // 是否存在用户
  async isExistUser(name: string) {
    const isExist = await this.userRepository.exist({
      where: {
        username: name,
      },
    });
    console.log('isExist', isExist);

    return isExist;
  }
}
