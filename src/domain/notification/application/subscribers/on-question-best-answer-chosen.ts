import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { QuestionBestQuestionChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen-event'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  // método para criar o subscriber
  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this), // Ele teve que fazer o bind pq a função será chamada lá pelo dispatch
      QuestionBestQuestionChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestQuestionChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      const resumedQuestionTitle = question.title.substring(0, 20).concat('...')

      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Your answer was chosen as the best answer!',
        content: `The answer you send in "${resumedQuestionTitle}" was chosen by the author as the best`,
      })
    }
  }
}
