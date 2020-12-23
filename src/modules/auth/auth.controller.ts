import { ResModel } from '@/common/class/index.class'
import { UserService } from '@/modules/user/user.service'
import { AuthService } from './auth.service'
import { Body, Controller, Get, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { LoginInterceptor } from '@/common/interceptor/user.interceptor'
import { JoiValidationPipe } from '@/common/pipe/joi.validation.pipe'
import { UserLoginDto } from '../user/dto/userLogin.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
    private readonly userService:UserService
  ) {}

    // 测试连接
    @Get()
  test() {
    return new ResModel(1, {}, 'auth was working')
  }

    // 登录
    @Post('login')
    @ApiBody({ description: '请输入登录信息', required: true })
    @UseInterceptors(LoginInterceptor)
    @UsePipes(new JoiValidationPipe())
    async login(@Body() loginInfo: UserLoginDto) {
      // this.authService.test()
      const result = await this.authService.validateUser(loginInfo.email, loginInfo.password)
      return result
    }
}
