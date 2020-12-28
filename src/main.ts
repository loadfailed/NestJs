import { MainInterceptor } from './common/interceptor/main.interceptor'
import { AuthGuard } from './common/guard/auth.guard'
import { AnyExceptionFilter } from './common/filter/any.exception.filter'
import { HttpExceptionFilter } from './common/filter/http.exception.filter'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { logger } from './common/middleware/logger.middleware'
import { Log4jsService } from '@quickts/nestjs-log4js'

import 'reflect-metadata'

async function bootstrap() {
  const log4js = new Log4jsService()
  const app = await NestFactory.create(AppModule, { logger: log4js })
  app.use(logger)
  app.useGlobalFilters(new AnyExceptionFilter())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new MainInterceptor())
  app.useGlobalGuards(new AuthGuard())
  const swaggerOptions = new DocumentBuilder()
    .setTitle('server api')
    .setDescription('nestjs构建的server')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('/doc', app, document)
  await app.listen(3000)
}
bootstrap()
