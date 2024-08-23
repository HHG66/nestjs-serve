/*
 * @Author: HHG
 * @Date: 2024-08-23 17:39:11
 * @LastEditTime: 2024-08-23 17:41:47
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\modules\user\auth.service.ts
 * @文件说明: 
 */
import { compare } from '@/utils/cryptogram';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user';
import { LoginService } from './user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => LoginService))
    private readonly loginServe: LoginService,
  ) { }

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    // console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.loginServe.findOne(username);
    if (user) {
      const Password = user.password;
      //明文密码
      if (compare(password, user.password)) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理得到 jwt 签证
  async certificate(user: CreateUserDto) {
    const payload = { username: user.username };
    // console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return {
        // code: '00000',
        token,
        message: `登录成功`,
      };
    } catch (error) {
      return {
        code: '1',
        message: `账号或密码错误`,
      };
    }
  }


}
