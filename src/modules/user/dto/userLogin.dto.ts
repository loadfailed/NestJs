import { IsString } from 'class-validator'

export class UserLoginDto {
  @IsString()
  readonly username: string

  @IsString()
  readonly password: string
}
