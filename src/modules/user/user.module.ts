import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './user.service';
import { LoginController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsrSchema } from '@/entities/User.entities';
// import { AuthService } from 'src/modules/auth/auth.service';
// import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from '../../config/jwt.config';

@Module({
  imports: [
    // forwardRef(() => JwtService),
    ConfigModule.forRoot({
      load: [jwtConfig],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UsrSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: configService.get<string>('accessTokenExpiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController],
  providers: [JwtStrategy, LoginService, AuthService],
  exports: [LoginService, AuthService, JwtStrategy],
})
export class UserModule {}
