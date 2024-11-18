/*
 * @Author: HHG
 * @Date: 2023-12-12 14:11:01
 * @LastEditTime: 2023-12-14 12:15:35
 * @LastEditors: 韩宏广
 * @FilePath: \website\src\common\guards\jwtAuth.guards.ts
 * @文件说明:
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../decorators/isPublic.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
