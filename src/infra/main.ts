import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { TEnv } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  const configService: ConfigService<TEnv, true> = app.get(ConfigService) // Buscando uma dependência (serviço de config) do AppModule
  const port = configService.get('PORT', { infer: true }) // Esse segundo parâmetro com infer foi pra inferir automaticamente o tipo dessa variável

  await app.listen(port)
}
bootstrap()
