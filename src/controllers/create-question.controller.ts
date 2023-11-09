// import { z } from 'zod'

// const createQuestionBodySchema = z.object({
//   email: z.string().email(),
//   password: z.string(),
// })

// type TCreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

// @Controller('/questions')
// export class CreateQuestionController {
//   constructor(private prisma: PrismaService) {}

//   @Post()
//   @UsePipes(new ZodValidationPipe(loginBodySchema))
//   async handle() {}
// }
