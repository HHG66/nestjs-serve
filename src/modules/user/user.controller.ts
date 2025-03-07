import {
  Controller,
  Post,
  Body,
  Logger,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { LoginService } from './user.service';
import { Public } from '@/common/decorators/isPublic.decorator';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  //登录，用户管理做到单独的角色管理系统
  @Post('login')
  @Public()
  async login(@Body() userInfo: CreateUserDto) {
    console.log(userInfo);
    return this.loginService.login(userInfo);
  }

  //创建用户
  @Post('createuser')
  @Public()
  createuser(@Body() userInfo: CreateUserDto) {
    console.log(userInfo);
    return this.loginService.createUser(userInfo);
  }

  //ceshi
  @Post('test')
  test() {
    // throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    return {
      code: 1,
      test: [
        {
          name: 1,
          id: 1,
        },
        {
          name: 12,
          id: 1,
        },
      ],
      iu: 'hahh',
    };
  }
}
