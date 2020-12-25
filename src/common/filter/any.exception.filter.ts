import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import axios from 'axios'

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse()
    const req = ctx.getRequest()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    console.log('AnyException过滤器')
    axios({
      url: `https://sc.ftqq.com/SCU42770Td244eee6f2eaa2d962c1828d1e7af72e5c4715bee5346.send?text=${encodeURI('服务异常')}&desp=${new Date().toISOString()}，${exception?.message}，${req.url}`,
      method: 'get'
    })
    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      error: exception?.message
    })
  }
}
