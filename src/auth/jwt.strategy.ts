import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TEnv } from 'src/env'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type TUserPayload = z.infer<typeof tokenPayloadSchema>

// Esse código ele pegou de um exemplo da documentação

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<TEnv, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: TUserPayload) {
    // Validar se é um token válido com o sub dentro dele.
    return tokenPayloadSchema.parse(payload)
  }
}
