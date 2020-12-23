import { ResModel } from './../../common/class/index.class'
import { HttpException } from '@nestjs/common'
/*
 * @Author: your name
 * @Date: 2020-09-27 02:46:26
 * @LastEditTime: 2020-11-03 02:48:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/modules/user/user.service.ts
 */
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserLoginDto } from './dto/userLogin.dto'
import { UserRegisterDto } from './dto/userRegister.dto'
import uRequest from '../../utils/request'
import { User } from './entity/user.entity'

import createMysqlID from '@/utils/createMysqlId'
import formatDate from '@/utils/formatDate'
import { encryptoPassword } from '@/utils/crypto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // findOne(username: string): Promise<User | undefined> {
  //   return new Promise()
  // }

  async findOne(email: string):Promise<any> {
    return await this.userRepository.findOne({ email })
  }

  async register(form:UserRegisterDto) {
    // 从数据库查询email是否已存在
    const findOne = await this.userRepository.findOne({ email: form.email })
    if (findOne) {
      return new ResModel(0, { }, '新增失败，该邮箱已注册')
    }

    // 用户信息校验
    const id = createMysqlID()
    const password = encryptoPassword(form.password, id)
    const user = new User(id, form.username, password, form.email, form.mobile)

    // 储存到数据库
    await this.userRepository.save(user)
    return new ResModel(1, { id: user.id }, '新增成功')
  }

  async login(form: UserLoginDto) {
    // 从数据库查询email是否已存在
    const findOne = await this.userRepository.findOne({ email: form.email })
    if (findOne) {
      const password = encryptoPassword(form.password, findOne.id)
      return new ResModel(1, { id: findOne.id, username: findOne.username }, '登录成功')
    } else {
      return new ResModel(0, {}, '邮箱/密码错误')
    }
  }
}
