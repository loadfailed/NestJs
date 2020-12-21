import { IsEmail, IsString } from 'class-validator'

export class UserRegisterDto {

  @IsString()
  readonly username: string

  @IsEmail()
  readonly email: string

  @IsString()
  readonly password: string

  @IsString()
  readonly mobile: string
}
