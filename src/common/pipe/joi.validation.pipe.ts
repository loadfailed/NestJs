import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

// @Injectable()
// export class JoiValidationPipe implements PipeTransform {
//   constructor(private schema: ObjectSchema) {}

//   transform(value: any, metadata: ArgumentMetadata) {
//     const { error } = this.schema.validate(value)
//     if (error) {
//       console.log(`管道校验失败: ${error.details[0].message}`)
//       throw new BadRequestException('传参校验失败')
//     }
//     return value
//   }
// }

@Injectable()
export class JoiValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const error = await validate(object)
    const message = error.map(err => {
      return Object
        .keys(err.constraints)
        .map(value => err.constraints[value])
        .join(';')
    }).join(';')
    if (error.length > 0) {
      throw new BadRequestException({
        code: 0,
        message
      })
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
