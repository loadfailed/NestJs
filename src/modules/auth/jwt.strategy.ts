import { JwtPayload, ResModel } from '@/common/class/index.class'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt'
import { UserService } from '../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '19941208'
    })
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const { id } = payload
    const entity = await this.userService.findOne({ id })
    if (!entity) {
      throw new UnauthorizedException(new ResModel(0, { entity }, '用户不存在'))
    }

    return entity
  }
}
