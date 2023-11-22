import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  INotificationProps,
  Notification,
} from '@/domain/notification/enterprise/entities/notification'
import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<INotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(5),
      content: faker.lorem.sentence(12),
      ...override,
    },
    id,
  )

  return notification
}
