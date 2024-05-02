# QSpy

QSpy is a project that uses a Lambda function to count and list events in dead-letter queues. The Lambda function can be run synchronously to quickly read from a dead-letter queue, or asynchronously to have the results stored in DynamoDB for later retrieval.

## Configuration

The project contains a `samconfig.toml.dist` which is a project-level configuration file that stores default parameters for the SAM CLI commands.

Update this file with your configuration parameters.

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
    --cli-binary-format raw-in-base64-out \
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
