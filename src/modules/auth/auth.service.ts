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

  async validateUser(username:string, password:string):Promise<any> {
    // 从数据库查询email是否已存在
    const findOne = await this.userService.findOne({ username })
    const enCryptoPwd = encryptoPassword(password, findOne?.id)
    if (findOne && findOne.password === enCryptoPwd) {
      const { id, username }:JwtPayload = findOne
      const payload = { id, username }
      const token = this.signToken(payload)
      return { id, username, token }
    } else {
      return null
    }
  }

  signToken(data:JwtModule) {
    return this.jwtService.sign(data)
  }
}
