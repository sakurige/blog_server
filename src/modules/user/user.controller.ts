import { Body, Controller, Post } from '@nestjs/common';

import { UesrDto } from './dtos/user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/login')
  async login(@Body() user: UesrDto) {
    console.log('user', user);
    const userInfo = await this.userService.getUser(user.username);
    return {
      code: 200,
      mes: {
        ...userInfo,
      },
    };
  }
  @Post('/register')
  async register(@Body() user: UesrDto) {
    const res = await this.userService.createUser(user);
    return {
      ...res,
    };
  }
}
