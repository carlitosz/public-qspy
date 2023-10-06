/**
 * Injects test Domain Events into a queue.
 *
 * NOTE: Create an .env file in this directory with your environment variables.
 */

import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'
import { fromIni } from '@aws-sdk/credential-provider-ini'
import { SQSClient, SQSClientConfig, SendMessageBatchCommand, SendMessageBatchRequestEntry } from '@aws-sdk/client-sqs'

const NUMBER_OF_MESSAGES = process.env.NUMBER_OF_MESSAGES
const QUEUE_URL = process.env.QUEUE_URL
const EVENT_TYPES = [
    'Preprints\\Domain\\Model\\Article\\ArticleDuplicatesDetected',
    'Preprints\\Domain\\Model\\Article\\ArticleDeskRejected',
    'Preprints\\Domain\\Model\\Article\\ArticlesMerged',
    'Preprints\\Domain\\Model\\Article\\ArticleOptedOut',
    'Preprints\\Domain\\Model\\Article\\ArticlePublished',
    'Preprints\\Domain\\Model\\Article\\ArticlePublished',
    'Preprints\\Domain\\Model\\Article\\ArticlePublished',
    'Preprints\\Domain\\Model\\Article\\ArticlePublishedInJournal',
    'Preprints\\Domain\\Model\\Article\\ArticleSearchReIndexRequested',
    'Preprints\\Domain\\Model\\Article\\ArticleWorkflowEventOccurred',
    'Preprints\\Domain\\Model\\Article\\CommentAdded',
    'Preprints\\Domain\\Model\\Article\\CommentFlagged',
    'Preprints\\Domain\\Model\\Article\\CommentPassedAutomoderation',
    'Preprints\\Domain\\Model\\Article\\Concern',
    'Preprints\\Domain\\Model\\Article\\DdsData',
    'Preprints\\Domain\\Model\\Article\\DeIndexPublishedVersion',
    'Preprints\\Domain\\Model\\Article\\DoiIssued',
    'Preprints\\Domain\\Model\\Article\\EditorialEventAdded',
    'Preprints\\Domain\\Model\\Article\\EditorialEventModified',
    'Preprints\\Domain\\Model\\Article\\FigureAdded',
    'Preprints\\Domain\\Model\\Article\\FileDeleted',
    'Preprints\\Domain\\Model\\Article\\FileUploaded',
    'Preprints\\Domain\\Model\\Article\\PdfOnlyToggled',
    'Preprints\\Domain\\Model\\Article\\PrescreenWorkflowReady',
    'Preprints\\Domain\\Model\\Article\\RevisionWorkflowReady',
    'Preprints\\Domain\\Model\\Article\\RevisionWorkflowPublished',
    'Preprints\\Domain\\Model\\Article\\PrescreenWorkflowPassUndone',
    'Preprints\\Domain\\Model\\Article\\QCWorkflowReturnedToProduction',
    'Preprints\\Domain\\Model\\Article\\WorkflowReassigned',
    'Preprints\\Domain\\Model\\Article\\ManuscriptAssessment\\ManuscriptAssessmentPurchased',
    'Preprints\\Domain\\Model\\Article\\OptedInToInReview',
    'Preprints\\Domain\\Model\\Article\\OptedOutArticleCreated',
    'Preprints\\Domain\\Model\\Article\\OptedOutArticleRejected',
    'Preprints\\Domain\\Model\\Article\\PrescreenCompleted',
    'Preprints\\Domain\\Model\\Article\\AosDetectionReady',
    'Preprints\\Domain\\Model\\Article\\PrescreenWorkflowFailed',
    'Preprints\\Domain\\Model\\Article\\PublishedArticleModified',
    'Preprints\\Domain\\Model\\Article\\PublishedArticleRejected',
    'Preprints\\Domain\\Model\\Article\\QCWorkflowReady',
    'Preprints\\Domain\\Model\\Article\\RejectedArticleGracefullyExitedPreProductionWorkflows',
    'Preprints\\Domain\\Model\\Article\\TextExtractionCompleted',
    'Preprints\\Domain\\Model\\Article\\VersionDeactivated',
    'Preprints\\Domain\\Model\\Article\\UnsupportedInReviewOptInSubmitted',
    'Preprints\\Domain\\Model\\Article\\VersionDoiAliased',
    'Preprints\\Domain\\Model\\Article\\VersionHidden',
    'Preprints\\Domain\\Model\\Article\\VersionPublished',
    'Preprints\\Domain\\Model\\Article\\VersionUnhidden',
    'Preprints\\Domain\\Model\\Article\\VorData',
    'Preprints\\Domain\\Model\\Article\\WorkflowCsHold',
    'Preprints\\Domain\\Model\\AutoPrescreen\\AutoPrescreenCompleted',
    'Preprints\\Domain\\Model\\AutoPrescreen\\AutoPrescreenStarted',
    'Preprints\\Domain\\Model\\InReviewMetrics\\NewSub',
    'Preprints\\Domain\\Model\\EJP\\NewEditorialEventAdded',
    'Preprints\\Domain\\Model\\EJP\\NewFileDownloadRequested',
    'Preprints\\Domain\\Model\\EJP\\NewFileDownloaded',
    'Preprints\\Domain\\Model\\EJP\\NewMoveEventsReceived',
    'Preprints\\Domain\\Model\\EJP\\NewSubmissionDataReceived',
    'Preprints\\Domain\\Model\\File\\CopiedAllFiles',
    'Preprints\\Domain\\Model\\File\\CopyPublishedFileRequested',
    'Preprints\\Domain\\Model\\File\\PublishedFileCopied',
    'Preprints\\Domain\\Model\\SFMC\\SFMCCustomerCreated',
    'Preprints\\Domain\\Model\\Marketing\\SignUpForMarketing',
    'Preprints\\Domain\\Model\\ReceivedVOREmail',
    'Preprints\\Domain\\Model\\TiffConvertedToPng',
    'RandBots\\EM\\BMC\\NewSubWithData',
    'RandBots\\EM\\BMC\\NewData',
    'RandBots\\EM\\BMC\\EmUsageMetrics',
    'RandBots\\ACDC\\Error',
    'RandFunctions\\Domain\\Model\\ACDCFileProcessingFailure',
    'RandFunctions\\Domain\\Model\\ReceivedAosDetermination',
    'RandFunctions\\Domain\\Model\\ReceivedDocx2PdfConversion',
    'RandFunctions\\Domain\\Model\\ReceivedLanguageAssessmentOfSourceFile',
    'RandFunctions\\Domain\\Model\\ReceivedLanguageAssessmentOfImprovedFile',
    'RandFunctions\\Domain\\Model\\ReceivedLanguageImprovementOfSourceFile',
    'RandFunctions\\Domain\\Model\\ReceivedDocumentDetailsOfImprovedFile',
    'RandFunctions\\Domain\\Model\\ReceivedEmApiRecord',
    'RandFunctions\\Domain\\Model\\ReceivedStoaFile',
    'RandFunctions\\Domain\\Model\\ReceivedStoaSubmissionSummary',
    'RandFunctions\\Domain\\Model\\ReceivedVOREmail',
    'RandFunctions\\Domain\\Model\\TiffConvertedToPng',
    'ResearchSquare\\Audichron\\Domain\\Model\\HourChanged',
    'Preprints\\Domain\\Model\\InReviewMetrics\\NewSub'
]

const config: SQSClientConfig = {
    region: process.env.AWS_REGION,
    credentials: fromIni({ profile: process.env.AWS_PROFILE })
}
const sqsClient: SQSClient = new SQSClient(config)

/**
 * Generates batches of 10 messages.
 * Event types are randomly selected from EVENT_TYPES.
 */
const generateMessages = (): SendMessageBatchRequestEntry[] => {
    const messages: SendMessageBatchRequestEntry[] = []

    for (let i = 0; i < 10; i++) {
        messages.push({
            Id: uuidv4(),
            MessageBody: JSON.stringify({
                Message: JSON.stringify({
                    name: EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]
                })
            })
        })
    }

    return messages
}

const inject = async () => {
    if (NUMBER_OF_MESSAGES === undefined || QUEUE_URL === undefined) {
        throw new Error('You must set NUMBER_OF_MESSAGES and QUEUE_URL in your .env')
    }

    const batches: number = Math.floor(parseInt(NUMBER_OF_MESSAGES) / 10)

    for (let i = 0; i < batches; i++) {
        console.info(`Running batch ${i + 1}`)

        const res = await sqsClient.send(
            new SendMessageBatchCommand({
                QueueUrl: QUEUE_URL,
                Entries: generateMessages()
            })
        )

        if (res.Failed) {
            console.error(`Failed at batch ${i}`)
            break
        }

        if (res.Successful) {
            console.info(`Inserted batch ${i + 1}`)
        }
    }
}

inject()

export default inject
