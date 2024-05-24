# QSPY

This project contains the code for running the Qspy project locally within a docker container and the code for deploying the backend to AWS.

## Prerequisites

This project uses [Docker](https://docs.docker.com/get-docker/) on the frontend and the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) to configure and deploy an AWS infrastructure.

The project assumes you have an `~/.aws` directory with your credentials and configuration for AWS.

## Getting started
There exists a `Makefile` at the root of the project that will help you get started. This Makefile contains instructions for configuring the application, deploying the application to a development environment, and testing the function (yay unit tests!).

Before continuing, make sure to clone this repository to your local machine.

## Configuration
Run `make config` from the root of the project to generate configuration files to help get you started.

- An environment variables file `.env` in the `/next` directory
- A SAM TOML configuration file `samconfig.toml` in the `/infrastructure` directory

### samconfig.toml

Please fill in the following parameters in the `samconfig.toml` file:

| Parameter  | Description | Required |
| ------------- | ------------- | ------------- |
| profile  | Your AWS profile as defined in your `~/.aws/config` | Yes |
| s3_bucket  | The S3 bucket used by CloudFormation to store artifacts, this bucket needs to exist  | Yes |
| parameter_overrides  | Project specific parameters. Params are pre-defined and you only need `deadletterQueueArn` and `deadletterQueueUrl` | Yes |

## Deploying Backend

To deploy the backend, cd into the `/infrastructure` directory and run `sam build && sam deploy`. This will initiate the build and deploy process. The following resources will be created:

| Resource  | Description | Required |
| ------------- | ------------- | ------------- |
| AnalyzeFunction (Lambda)  | When invoked, this function reads the deadletter queue defined in samconfig.toml  | Yes |
| ApiGetFunction (Lambda)  | Proxy function for API Gateway that queries DynamoDB and returns serialized results (JSON)  | Yes |
| StoreFunction (Lambda)  | Receives output from AnalyzeFunction and stores the result in DynamoDB  | Yes |
| Dynamo Table  | Stores output from Analyze function. Configured to store max one record per day.  | Yes |
| EventBridge Schedule  | Invokes the AnalyzeFunction once per day at 3am EST  | Yes |
| REST API  | Exposes a GET `/events` endpoint and returns results from DynamoDB. This resource also attaches a usage plan and assigns 5000 monthly requests, a burst limit of 100, and a rate limit of 50.  | Yes |

## Environment Variables

Now that the backend is deployed, update the .env file in the `/next`. Use the API Gateway console to generate a new API key for your endpoint and plug in the values below.

| Variable  | Description | Required |
| ------------- | ------------- | ------------- |
| NEXT_PUBLIC_API_GATEWAY  | The API Gateway endpoint  | Yes |
| NEXT_PUBLIC_API_KEY  | The API Key  | Yes |

## Run the project

Whew! You should now be able to start up the project. First, run `make deps` locally to install frontend and backend dependencies.

From the root of the project, run `./bin/docker.sh start` to build a new docker image and start a docker container. To stop the container run `ctrl + z` or stop the container manually if you are using Docker Desktop.

*Note:* if you receive a message `failed to solve: public.ecr.aws/c6h2f5t7/qspy-public:20-base: unexpected status from HEAD request to https://public.ecr.aws/v2/c6h2f5t7/qspy-public/manifests/20-base: 403 Forbidden` you'll have to log out of your current ECR session with `docker logout public.ecr.aws`

In a second terminal window, you can bash into the container by running `./bin/docker.sh sh`. From within the container, you can run tests using `make test`.

The project is at `localhost:3000`, happy contributing!
