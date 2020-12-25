import { IsArray } from 'class-validator'

export class UserSetFollowingDTO {
  @IsArray()
  readonly list: Array<string>
}
