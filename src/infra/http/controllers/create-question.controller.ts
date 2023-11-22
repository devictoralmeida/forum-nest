import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { Question } from "@prisma/client";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth";
import { TUserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { z } from "zod";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type TCreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: TCreateQuestionBodySchema, // também posso usar o pipe dessa forma, passando pelo body
    @CurrentUser() user: TUserPayload,
  ): Promise<Question> {
    // user = { sub: user.id }

    const { title, content } = body;
    const userId = user.sub;

    const slug = this.convertToSlug(title);

    const question = await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    });

    return question;
  }
}
