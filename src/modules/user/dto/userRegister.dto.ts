import { IsEmail, IsString } from 'class-validator'

export class UserRegisterDto {
  @IsString({ message: '请输入用户名(username)' })
  readonly username: string

  @IsEmail({}, { message: '请输入邮箱(email)' })
  readonly email: string

  @IsString({ message: '请输入密码(password)' })
  readonly password: string

  @IsString({ message: '请输入手机号(mobile)' })
  readonly mobile: string
}
