/*
 * @Author: your name
 * @Date: 2020-09-27 02:46:17
 * @LastEditTime: 2020-10-07 17:26:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/modules/user/user.module.ts
 */
import { UserDetail } from './entity/user_detail.entity'
import { User } from './entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetail])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
