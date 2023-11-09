import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      // Essa sintaxe é sugerida pela docs do nest.
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreateAccountController], // Aq declara todas as classes de controllers
  providers: [PrismaService], // Aq declara todas as dependências q os controllers podem ter.
})
export class AppModule {}
