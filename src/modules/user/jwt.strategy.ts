/*
 * @Author: HHG
 * @Date: 2024-08-26 09:21:02
 * @LastEditTime: 2024-08-26 09:21:06
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\modules\jwt.strategy.ts
 * @文件说明:
 */
/*
 * @Author: HHG
 * @Date: 2023-12-14 08:44:20
 * @LastEditTime: 2024-01-03 19:25:02
 * @LastEditors: 韩宏广
 * @FilePath: \website-nest\src\modules\auth\jwt.strategy.ts
 * @文件说明:
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../constants/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret'),
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    // console.log(`JWT验证 - Step 4: 被守卫调用`);
    return { username: payload.username };
  }
}
