/*
 * @Author: your name
 * @Date: 2020-09-27 23:31:34
 * @LastEditTime: 2020-10-07 03:00:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/common/interceptor/main.interceptor.ts
 */
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class MainInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        return {
          code: 1,
          data,
          msg: '请求成功'
        }
      }),
      catchError(err => {
        if (err instanceof HttpException) {
          throw err
        } else {
          throw new HttpException(
            {
              code: 0,
              data: {},
              message: err.error
            },
            200
          )
        }
      })
    )
  }
}
