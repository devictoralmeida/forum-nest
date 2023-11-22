import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { TUserPayload } from './jwt.strategy'

// Vamos criar um decorator que será usado no parâmetro de uma função, q nem o @Body()
// O ExecutionContext trás o contexto da requisição

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.user as TUserPayload
  },
)
