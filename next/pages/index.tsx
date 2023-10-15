import React from 'react'

import type { NextPage } from 'next'

import Chart from '@/components/ApexChart/Chart'
import ChartSkeleton from '@/components/ApexChart/ChartSkeleton'

interface HomePageProps {}

const Home: NextPage<HomePageProps> = ({}: HomePageProps) => {
    return (
        <div className="main-content flex flex-col flex-grow p-6">
            <h1 className="font-bold text-2xl text-indigo-700">Dashboard</h1>
            <div className="flex flex-col bg-white rounded mt-4">
                <ChartSkeleton />
            </div>
            <div className="flex flex-col bg-white rounded mt-4">
                {typeof window !== undefined && (
                    <Chart
                        type="bar"
                        data={[
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ArticleDuplicatesDetected',
                                count: 15
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\VersionDeactivated',
                                count: 10
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\QCWorkflowReady',
                                count: 13
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\TiffConvertedToPng',
                                count: 7
                            },
                            {
                                event: 'RandBots\\ACDC\\Error',
                                count: 9
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\AosDetectionReady',
                                count: 8
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\VersionDoiAliased',
                                count: 5
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\PrescreenCompleted',
                                count: 11
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\WorkflowCsHold',
                                count: 9
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ArticleDeskRejected',
                                count: 11
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\TiffConvertedToPng',
                                count: 9
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\EJP\\NewMoveEventsReceived',
                                count: 12
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\UnsupportedInReviewOptInSubmitted',
                                count: 11
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\PrescreenWorkflowReady',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\File\\PublishedFileCopied',
                                count: 7
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedLanguageImprovementOfSourceFile',
                                count: 9
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ArticlePublished',
                                count: 24
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\VersionHidden',
                                count: 9
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\Concern',
                                count: 13
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ManuscriptAssessment\\ManuscriptAssessmentPurchased',
                                count: 14
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedDocumentDetailsOfImprovedFile',
                                count: 8
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\InReviewMetrics\\NewSub',
                                count: 16
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\RevisionWorkflowReady',
                                count: 6
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ArticleSearchReIndexRequested',
                                count: 8
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\CommentPassedAutomoderation',
                                count: 8
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\FigureAdded',
                                count: 8
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\OptedInToInReview',
                                count: 9
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ArticlesMerged',
                                count: 14
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\EditorialEventModified',
                                count: 11
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\VersionUnhidden',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\PrescreenWorkflowFailed',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\PdfOnlyToggled',
                                count: 14
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\EJP\\NewEditorialEventAdded',
                                count: 5
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\File\\CopyPublishedFileRequested',
                                count: 9
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedStoaSubmissionSummary',
                                count: 8
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\AutoPrescreen\\AutoPrescreenCompleted',
                                count: 11
                            },
                            {
                                event: 'RandBots\\EM\\BMC\\NewSubWithData',
                                count: 6
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ArticleWorkflowEventOccurred',
                                count: 5
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedDocx2PdfConversion',
                                count: 6
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\RejectedArticleGracefullyExitedPreProductionWorkflows',
                                count: 6
                            },
                            {
                                event: 'RandBots\\EM\\BMC\\EmUsageMetrics',
                                count: 6
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\VersionPublished',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\ReceivedVOREmail',
                                count: 8
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\OptedOutArticleRejected',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\AutoPrescreen\\AutoPrescreenStarted',
                                count: 6
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedAosDetermination',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Marketing\\SignUpForMarketing',
                                count: 4
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\EditorialEventAdded',
                                count: 6
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\QCWorkflowReturnedToProduction',
                                count: 6
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedEmApiRecord',
                                count: 9
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedVOREmail',
                                count: 9
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedLanguageAssessmentOfImprovedFile',
                                count: 5
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ArticleOptedOut',
                                count: 9
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\DdsData',
                                count: 2
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\RevisionWorkflowPublished',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\FileUploaded',
                                count: 10
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedStoaFile',
                                count: 8
                            },
                            {
                                event: 'ResearchSquare\\Audichron\\Domain\\Model\\HourChanged',
                                count: 10
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ACDCFileProcessingFailure',
                                count: 9
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\ArticlePublishedInJournal',
                                count: 11
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\FileDeleted',
                                count: 4
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\EJP\\NewFileDownloadRequested',
                                count: 7
                            },
                            {
                                event: 'RandFunctions\\Domain\\Model\\ReceivedLanguageAssessmentOfSourceFile',
                                count: 8
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\PrescreenWorkflowPassUndone',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\PublishedArticleRejected',
                                count: 11
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\File\\CopiedAllFiles',
                                count: 5
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\TextExtractionCompleted',
                                count: 10
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\OptedOutArticleCreated',
                                count: 8
                            },
                            {
                                event: 'RandBots\\EM\\BMC\\NewData',
                                count: 5
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\WorkflowReassigned',
                                count: 10
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\DoiIssued',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\VorData',
                                count: 6
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\EJP\\NewSubmissionDataReceived',
                                count: 5
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\CommentAdded',
                                count: 7
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\PublishedArticleModified',
                                count: 4
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\EJP\\NewFileDownloaded',
                                count: 5
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\DeIndexPublishedVersion',
                                count: 2
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\SFMC\\SFMCCustomerCreated',
                                count: 3
                            },
                            {
                                event: 'Preprints\\Domain\\Model\\Article\\CommentFlagged',
                                count: 5
                            }
                        ]}
                    />
                )}
            </div>
        </div>
    )
}

Home.getInitialProps = async (): Promise<HomePageProps> => {
    return {
        data:
    }
}

export default Home
