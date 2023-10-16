# QSpy

QSpy is a project that uses a Lambda function to count and list Domain Events in dead-letter queues. The Lambda function can be run synchronously to quickly read from a dead-letter queue, or asynchronously to have the results stored in DynamoDB for later retrieval.

## Configuration

The project contains a `samconfig.toml.dist` which is a project-level configuration file that stores default parameters for the SAM CLI commands.

Update this file with your configuration parameters.

### Parameter overrides

-   **stage**: The stage where you want to deploy the stack.
    -   This will also serve as a prefix to all resources created, such as `lambda-function-development`.
-   **readPolicyResource**: The resource ARN of the dead-letter queue if you intend to read from a single deadletter-queue, or a modified ARN that includes wildcard a `*` character to read from multiple queues.
-   **queueUrl**: The URL of your target dead-letter queue.

## Deploy

The stack can is configured to deploy to `development` and `production` environments. There is a `Makefile` included in the project that will deploy to both environments.

-   `Make deploy-development` to deploy development
-   `Make deploy-production` to deploy production

These commands will remove any locally existing builds, re-build the project, and deploy to AWS.

### CloudFormation

The provided `template.yaml` will create the following major resources:

-   Lambda function to read from the deadletter queue
-   Lambda function to store the data into Dynamo
-   DynamoDB table to store the data
-   Serverless API with configured endpoints to READ from DynamoDB
-   Lambda proxy function to handle GET requests to the API

## How it works

1. The analyze function reads the dead-letter queue and sends the results to the store function
1. The store function receives the data and stores it in DynamoDB

### Analyze

Analyze can be invoked **synchronously** via the AWS CLI using the following command or through the AWS lambda console.

Add your function URL to the `event/analyze_event.json` file, and fill in the required parameters.

```
aws lambda invoke \
    --function-name FUNCTION_NAME \
    --profile PROFILE \
    --region REGION \
    --payload file://infrastructure/functions/events/analyze_event.json response.json
```

Alternatively, analyze can be invoked **asynchronously** via the AWS CLI using the following command.

```
aws lambda invoke \
    --function-name FUNCTION_NAME \
    --profile PROFILE \
    --region REGION \
    --cli-binary-format raw-in-base64-out \
    --payload file://infrastructure/functions/events/analyze_event.json \
    --invocation-type Event response.json
```

**IMPORTANT**: Asynchronous invocation of _analyze_ will asynchronusly invoke _store_. If your async invocation succeeded, you will receive a 200 OK response and your data will be stored in DynamoDB.

For a faster analysis of your dead-letter queue, the best option is to use synchronous invocation.

### Store

Store should never be invoked manually unless you are on a development environment or unless you know what you're doing.

Store can only be invoked asynchronously. This function takes in a JSON payload and stores it in DynamoDB. By default, the JSON event stored in `event/store_event.json` will be used. This file contains test data that is structured identical to a response from _analyze_.

```
aws lambda invoke \
    --function-name FUNCTION_NAME \
    --profile PROFILE \
    --region REGION \
    --cli-binary-format raw-in-base64-out \
    --payload file://infrastructure/functions/events/store_event.json \
    --invocation-type Event response.json
```
