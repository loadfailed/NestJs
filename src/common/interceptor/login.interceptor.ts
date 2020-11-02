import { catchError, map } from 'rxjs/operators'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import mysqlID from '../../utils//mysql_id'

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        console.log(mysqlID())
        return data
      }),
      catchError(err => {
        throw err
      })
    )
  }
}
