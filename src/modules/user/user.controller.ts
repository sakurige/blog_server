import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/login')
  async login(@Body() user: CreateUserDto) {
    const userInfo = await this.userService.checkUser(user);
    return {
      ...userInfo,
    };
  }
  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    const res = await this.userService.createUser(user);
    return {
      ...res,
    };
  }
}
