import { v4 as uuidv4 } from 'uuid'
import { Message } from '@aws-sdk/client-sqs'

export const EVENT_TYPES = [
    'Preprints\\Domain\\Model\\Article\\ArticleDuplicatesDetected',
    'Preprints\\Domain\\Model\\Article\\ArticleDeskRejected',
    'Preprints\\Domain\\Model\\Article\\ArticlesMerged',
    'Preprints\\Domain\\Model\\Article\\ArticleOptedOut',
    'Preprints\\Domain\\Model\\Article\\ArticlePublished',
    'Preprints\\Domain\\Model\\Article\\ArticlePublished'
]

/**
 * Helper function to create
 */
export const createMessages = (numMessages: number): Message[] => {
    const messages: Message[] = []

    for (let i = 0; i < numMessages; i++) {
        messages.push({
            MessageId: uuidv4(),
            Body: JSON.stringify({
                Message: JSON.stringify({ name: EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)] })
            })
        })
    }

    return messages
}
