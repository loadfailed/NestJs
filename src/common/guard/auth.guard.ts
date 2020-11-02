import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    return this.validateRequest(req)
  }

  private validateRequest(
    req: Request
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log(req.headers)
    return true
  }
}
