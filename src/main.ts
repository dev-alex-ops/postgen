import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(1987, () => {
    console.info(`At 1987, in 'local', server 'PostGen' is listening`)
  })
}
bootstrap()
