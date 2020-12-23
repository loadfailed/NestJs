import { JwtStrategy } from './jwt.strategy'
import { UserModule } from '@/modules/user/user.module'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: '19941208',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
