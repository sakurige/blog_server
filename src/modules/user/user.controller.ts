import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { SharedService } from './../../shared/shared.service';
import { IResData } from './../../types/response.d';
import { CreateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sharedService: SharedService,
    private readonly authService: AuthService,
  ) {}
  @Post('/login')
  async login(@Body() user: CreateUserDto): Promise<IResData> {
    const userInfo = await this.userService.checkUser(user);
    if (userInfo.uid) {
      // 登录成功
      return {
        code: 1,
        msg: '登录成功',
        data: await this.sharedService.generateToken(userInfo.uid),
      };
    }
    return {
      ...userInfo,
    };
  }
  @Post('/register')
  async register(@Body() user: CreateUserDto): Promise<IResData> {
    const res = await this.userService.createUser(user);
    return {
      ...res,
      data: res.uid ? await this.sharedService.generateToken(res.uid) : {},
    };
  }
}
