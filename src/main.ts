import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const swaggerDocConfig = new DocumentBuilder()
    .setTitle('PostGen')
    .setVersion('0.0.1')
    .addTag('Endpoints')
    .build()
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocConfig)
  SwaggerModule.setup('/', app, swaggerDoc)

  await app.listen(1987, () => {
    console.info(`At 1987, in 'local', server 'PostGen' is listening`)
  })
}
bootstrap()
