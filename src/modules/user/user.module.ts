import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './user.service';
import { LoginController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsrSchema } from './schemas/user.schemas'
// import { AuthService } from 'src/modules/auth/auth.service';
// import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
@Module({
  imports: [
    // forwardRef(() => JwtService),
    // forwardRef(() => AuthModule),
    // forwardRef(() => JwtModule),
    MongooseModule.forFeature([{ name: 'User', schema: UsrSchema }])],
  controllers: [LoginController],
  providers: [LoginService,AuthService,JwtService],
  exports: [LoginService,AuthService,JwtService],
})
export class UserModule { }
