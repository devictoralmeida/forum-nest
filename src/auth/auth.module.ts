import { ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TEnv } from 'src/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      // Para configurar o módulo JwtModule dentro do AuthModule, eu preciso dos dados de um serviço, o ConfigService que é uma classe, para isso é preciso o registro assíncrono + injeção dependencias.
      inject: [ConfigService], // Aqui podemos passar uma lista de serviços que serão injetados enquanto estou registrando esse módulo JWT
      global: true, // Preciso usar esse global pq é o controller que vai usar essas keys.
      useFactory(config: ConfigService<TEnv, true>) {
        // Como parâmetro da função você passa o serviço que irá receber, pega a variável ambiente e retorna ela
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'), // Preciso fazer o decode do base64
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
})
export class AuthModule {}
