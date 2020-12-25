import { formatDate } from '@/utils/formatDate'
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
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserRegisterDto } from './dto/userRegister.dto'
import { User } from './entity/user.entity'

interface FindUser {
  id?:string,
  username?:string
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // findOne(username: string): Promise<User | undefined> {
  //   return new Promise()
  // }

  async findOne(params: FindUser):Promise<User> {
    if (params.id || params.username) {
      return await this.userRepository.findOne(params)
    } else {
      throw new Error('请输入用户id或u_code')
    }
  }

  async register(form:UserRegisterDto) {
    // 从数据库查询用户名是否已存在
    const findOne = await this.userRepository.findOne({ username: form.username })
    if (findOne) throw new Error('新增失败，用户名已被注册')

    // 用户信息校验
    const user = new User(form.username, form.password, form.email, form.mobile)

    // 储存到数据库
    await this.userRepository.save(user)
    return { id: user.id }
  }

  async setFollowing(id:string, list:Array<string>):Promise<any> {
    const user = await this.findOne({ id })
    user.following = list
    user.updatetime = formatDate(new Date())
    await this.userRepository.save(user)
    return {
      id,
      following: list
    }
  }
}
