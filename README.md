# QSPY

This project contains the code for running the qspy project locally within a docker container, and also contains the code for deploying the backend functions to AWS.

## Prerequisites

This project uses [Docker](https://docs.docker.com/get-docker/) on the frontend and the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) to configure and deploy an AWS infrastructure.

## Getting started

You can use the `spy.sh` executable located in the `bin` directory to help you compose docker.

To build the development image and start the qspy-app container:

```
$ ./bin/spy.sh up
```

To stop the container from a separate terminal:

```
$ ./bin/spy.sh stop
```

See the `Spy` executable for more commands.
