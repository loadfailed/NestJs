import { ApiProperty } from '@nestjs/swagger'

export enum RemenberMe {
  on = 'on',
  off = 'off',
}

export class Hello {
  @ApiProperty({ example: '123456@qq.comm', description: '登陆邮箱示例' })
  email: string

  @ApiProperty({ example: '123456', description: '登陆密码示例' })
  password: string

  @ApiProperty({ enum: RemenberMe })
  remenberme: RemenberMe
}
