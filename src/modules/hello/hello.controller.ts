import { HelloSchema } from './schema/hello.schema'
import { JoiValidationPipe } from './../../common/pipe/joi.validation.pipe'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HelloService } from './hello.service'
import { CreateHelloDto } from './dto/hello.dto'
import {
  Controller,
  Query,
  Headers,
  Body,
  Get,
  Post,
  Param,
  Header,
  UsePipes
} from '@nestjs/common'
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { RemenberMe, Hello } from './classes/hello'
@ApiTags('Hello')
@Controller('hello')
export class HelloController {
  constructor(private readonly HelloService: HelloService) {}

  // 查询
  @Get()
  @ApiQuery({ name: 'id', required: false })
  @ApiQuery({ name: 'remenberme', enum: RemenberMe })
  @ApiResponse({
    status: 200,
    description: 'get……',
    type: Hello
  })
  hello(@Query() { id }, @Headers('token') token: string): string {
    return this.HelloService.hello(id)
  }

  // 保存
  @Post('save')
  @UsePipes(new JoiValidationPipe())
  @ApiParam({ name: 'name' })
  @ApiBody({ description: '请输入姓名' })
  save(@Body() CreateHelloDto: CreateHelloDto): string {
    return this.HelloService.save(CreateHelloDto)
  }

  // 更新
  @Post('update/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '请输入message' })
  update(@Param() { id }, @Body() { message }): string {
    return this.HelloService.update(id, message)
  }

  // 异常
  @Get('err')
  err() {
    return this.HelloService.err()
  }
}
