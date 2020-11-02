// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateHelloDto } from './dto/hello.dto'
import { HttpException, Injectable } from '@nestjs/common'

@Injectable()
export class HelloService {
  hello(id = 'nestjs'): string {
    return `hello ${id}`
  }

  save(CreateHelloDto: CreateHelloDto) {
    return `${CreateHelloDto.name}:${CreateHelloDto.id}`
  }

  update(id, message): string {
    return `hello world ${id + ':' + message}`
  }

  err() {
    throw new HttpException(
      {
        code: 0,
        error: '异常错误示例'
      },
      403
    )
  }
}
