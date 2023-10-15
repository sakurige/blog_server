import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SharedService } from './../../shared/shared.service';
import { CreateUserDto } from './dtos/user.dto';
import UserEntity from './entities/user.entity.mysql';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    private readonly sharedService: SharedService,
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
  async checkUser(user: CreateUserDto) {
    if (!(await this.isExistUser(user.username))) {
      return {
        code: 400,
        mes: 'user not exist',
      };
    }
    const _user = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (user.password === (await this.sharedService.decode(_user.password))) {
      return {
        code: 200,
        mes: `check user ${user.username} success`,
      };
    }
  }
  async createUser(user: CreateUserDto) {
    if (await this.isExistUser(user.username)) {
      return {
        code: 400,
        mes: 'user already exist',
      };
    }
    user.password = await this.sharedService.encode(user.password);
    // const res = await this.userRepository.save(user);
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
    return isExist;
  }
}
