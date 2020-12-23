import { JwtPayload } from '@/common/class/index.class'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { validate } from 'class-validator'
import { UserService } from './../user/user.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { encryptoPassword } from '@/utils/crypto'
import { ResModel } from '@/common/class/index.class'
import { CLIENT_RENEG_LIMIT } from 'tls'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService:JwtService
  ) {}

  async validateUser(email:string, password:string):Promise<any> {
    // 从数据库查询email是否已存在
    const findOne = await this.userService.findOne(email)
    const enCryptoPwd = encryptoPassword(password, findOne?.id)
    if (findOne && findOne.password === enCryptoPwd) {
      const { id, email, username }:JwtPayload = findOne
      const payload = { id, username, email }
      const token = this.signToken(payload)
      return new ResModel(1, { id, username, token }, '登录成功')
    } else {
      throw new UnauthorizedException(new ResModel(0, {}, '用户名/密码错误。'))
    }
  }

  signToken(data:JwtModule) {
    return this.jwtService.sign(data)
  }
}
