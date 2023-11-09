import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
// import { CreateQuestionController } from './controllers/create-question.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      // Essa sintaxe é sugerida pela docs do nest.
      // Ao registrar esse módulo ele devolve um configService.
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    // CreateQuestionController,
  ], // Aq declara todas as classes de controllers
  providers: [PrismaService], // Aq declara todas as dependências q os controllers podem ter.
})
export class AppModule {}
