import { ResModel } from './../../common/class/index.class'
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
  UseInterceptors,
  Request,
  UseGuards
} from '@nestjs/common'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe'
import { UserSetFollowingDTO } from './dto/userAddFolloing.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  // 测试连接
  @Get()
  test() {
    return new ResModel(1, {}, 'test')
  }

  // 注册
  @Post('register')
  @ApiBody({ description: '请输入注册信息', required: true })
  @UsePipes(new JoiValidationPipe())
  async register(@Body() userInfo: UserRegisterDto) {
    const user = await this.userService.register(userInfo)
    return new ResModel(1, user, '新增成功')
  }

  // 添加关注的抖音博主
  @Post('setFollowing')
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ description: '请输入要关注的抖音博主', required: true })
  @UsePipes(new JoiValidationPipe())
  async setFollowing(@Request() { user: { id }}, @Body() { list }: UserSetFollowingDTO) {
    const user = await this.userService.setFollowing(id, list)
    return new ResModel(1, user, '设置成功')
  }
}
