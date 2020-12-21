import { IsEmail, IsString } from 'class-validator'

export class UserRegisterDto {
  @IsString()
  readonly username: string

  @IsEmail({}, { message: '请输入正确的邮箱' })
  readonly email: string

  @IsString()
  readonly password: string

  @IsString()
  readonly mobile: string
}
