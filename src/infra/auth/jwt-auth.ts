/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGuard extends AuthGuard('jwt') {} // esse jwt entre aspas significa que irei usar o passport-jwt