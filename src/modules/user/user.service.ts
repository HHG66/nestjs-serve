import { ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserDocument } from './schemas/user.schemas'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user';
import { AuthService } from './auth.service';
import { encryption } from '@/utils/cryptogram'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Injectable()
export class LoginService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private authService: AuthService

  ) { }
  //创建用户

  async createUser(createUser: CreateUserDto) {
    let userInfo = {
      ...createUser,
      createDate: new Date(),
      updataDate: new Date(),
      password: encryption(createUser.password)
    }
    //查找用户
    const existUser = await this.userModel.findOne({ username: createUser.username });
    if (existUser) {
      return {
        code: 1,
        message: '已存在注册的用户'
      }
    }
    //插入用户
    const createUsers = new this.userModel(userInfo);
    const resule = await createUsers.save();
    return resule ?
      {
        message: "创建成功",
        username: resule.username
      } : {
        message: "创建失败"
      }

  }
  //查找用户
  async findOne(username: string): Promise<CreateUserDto | undefined> {
    return await this.userModel.findOne({ username: username })
  }
  //登录
  async login(userInfo: CreateUserDto) {
    const authResult = await this.authService.validateUser(userInfo.username, userInfo.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: '1',
          message: `账号或密码不正确`,
        };
      default:
        return {
          code: '1',
          message: `账号或密码不正确`,
        };
    }
  }

}
