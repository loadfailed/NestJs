import { IsString } from 'class-validator'

export class CreateHelloDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly id: string
}
