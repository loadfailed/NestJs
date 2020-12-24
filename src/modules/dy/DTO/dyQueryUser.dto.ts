import { IsString } from 'class-validator'

export class DyQueryUserDto {
  @IsString()
  readonly command: string
}
