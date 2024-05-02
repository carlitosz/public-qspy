import { v4 as uuidv4 } from 'uuid'
import { Message } from '@aws-sdk/client-sqs'

export const EVENT_TYPES = [
    'Project\\Domain\\Model\\Event\\EventDuplicatesDetected',
    'Project\\Domain\\Model\\Event\\EventRejected',
    'Project\\Domain\\Model\\Event\\EventsMerged',
    'Project\\Domain\\Model\\Event\\EventOptedOut',
    'Project\\Domain\\Model\\Event\\EventPublished'
]

/**
 * Helper function to create
 */
export const createMessages = (numMessages: number): Message[] => {
    const messages: Message[] = []

    for (let i = 0; i < numMessages; i++) {
        messages.push(createMessage(EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]))
    }

    return messages
}

export const createMessage = (name: string, occurredOn?: string | undefined): Message => {
    return {
        MessageId: uuidv4(),
        Body: JSON.stringify({
            Message: JSON.stringify({
                name,
                occurredOn: occurredOn ?? '2023-10-30 20:00:00'
            })
        })
    }
}
