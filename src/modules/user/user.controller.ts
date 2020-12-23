import { LoginInterceptor, CreateInterceptor } from '@/common/interceptor/user.interceptor'
import { UserService } from './user.service'
import { UserLoginDto } from './dto/userLogin.dto'
import { UserRegisterDto } from './dto/userRegister.dto'

import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  UsePipes,
  UseInterceptors
} from '@nestjs/common'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  // 查询用户
  @Get()
  @ApiQuery({ name: 'username', required: true })
  find(@Query() { username }) {
    return this.userService.findOne(username)
  }

  // 注册
  @Post('register')
  @ApiBody({ description: '请输入注册信息', required: true })
  @UsePipes(new JoiValidationPipe())
  register(@Body() userInfo: UserRegisterDto) {
    return this.userService.register(userInfo)
  }
}
