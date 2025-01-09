import {
  ForbiddenException,
  Inject,
  Injectable,
  // forwardRef,
} from '@nestjs/common';
import { UserDocument } from '@/model/User.entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user';
import { AuthService } from './auth.service';
import { encryption } from '@/utils/cryptogram';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ResponseDto } from '@/utils/response';
import { LoggingService } from '@/global/logger/logging.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService,
    @Inject() private readonly logger: LoggingService,
    private authService: AuthService
  ) {}
  //创建用户

  async createUser(createUser: CreateUserDto) {
    const userInfo = {
      ...createUser,
      createDate: new Date(),
      updataDate: new Date(),
      password: encryption(createUser.password),
    };
    //查找用户
    const existUser = await this.userModel.findOne({
      username: createUser.username,
    });
    if (existUser) {
      // return {
      //   code: 1,
      //   message: '已存在注册的用户',
      // };
      return ResponseDto.error("已存在注册的用户");
    }
    //插入用户
    const createUsers = new this.userModel(userInfo);
    const resule = await createUsers.save();
    return resule
      ? ResponseDto.success({}, undefined, '创建成功')
      : ResponseDto.error('失败');
  }
  //查找用户
  async findOne(username: string): Promise<CreateUserDto | undefined> {
    return await this.userModel.findOne({ username: username });
  }
  //登录
  async login(userInfo: CreateUserDto) {
    this.logger.log('请求成功login')
    const result = {
      wrongPassword: () => (ResponseDto.failureWithAutoTip('账号或密码不正确')),
      notFund: () => (ResponseDto.failureWithAutoTip('账号未注册')),
      handleSuccess: async () => (
           ResponseDto.success( {
            token: await this.authService.certificate(authResult.user),
            userInfo: { name: authResult.user.username },
          }, undefined, '创建成功')
       ),
    };
    const authResult = await this.authService.validateUser(
      userInfo.username,
      userInfo.password
    );
    const handler = result[authResult.err];
    if (handler) {
      return await handler(authResult);
    } else {
      return {
        code: '1',
        message: '未知错误',
      };
    }
  }

  // test(){

  // }
}
