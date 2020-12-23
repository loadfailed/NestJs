import { AuthModule } from './modules/auth/auth.module'
/*
 * @Author: your name
 * @Date: 2020-09-26 13:44:29
 * @LastEditTime: 2020-10-07 17:37:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/app.module.ts
 */
import { UserModule } from './modules/user/user.module'
import { HelloModule } from './modules/hello/hello.module'

import { Module } from '@nestjs/common'
import { ExceptionController } from './modules/exception/exception.controller'

import { TypeOrmModule } from '@nestjs/typeorm'
import { DyModule } from './modules/dy/dy.module'

@Module({
  imports: [
    HelloModule,
    UserModule,
    AuthModule,
    DyModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '111.231.114.121',
      port: 3306,
      username: 'root',
      password: '@sunway2020',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [ExceptionController]
})
export class AppModule {
  // constructor(private readonly connection: Connection) {}
}
