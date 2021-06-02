
## Local Offline Development

```bash
# install dynamodb local
$ npm run ddb:install

# start serverless-offline server
$ npm run sls:start

# start serverless-offline server and connect to online dynamodb
$ npm run sls:online
```

## Local NestJS Development - (Optional)

```bash
# install dynamodb local
$ npm run ddb:install

# start dynamodb local
$ npm run ddb:start

# start local nestjs server
$ npm start

# start local nestjs server in watch mode
$ npm run start:watch

# start local nestjs server and connect to online dynamodb
$ npm run start:online
```

## Unit Testing

```bash
# run unit test
$ npm test

# run unit test with coverage
$ npm run test:cov
```

## E2E Testing

```bash
# start dynamodb local
$ npm run ddb:start

# run unit test with coverage
$ npm run test:e2e
```

## GraphQL Endpoint Test

- offline: http://localhost:3000/dev/graphql
- local: http://localhost:3000/graphql
- AWS: https://<your_aws_deployment_id>.execute-api.<your_aws_region>.amazonaws.com/dev/graphql

```graphql
mutation {
  createNotification(
    input: { targetId: "device1", userId: "user1", content: "Hello World" }
  ) {
    id
  }
}
```

```graphql
query {
  notificationByUserId(userId: "user1") {
    id
    targetId
    userId
    content
    createAt
  }
}
```

```graphql
query {
  notificationByTargetId(targetId: "device1") {
    id
    targetId
    userId
    content
    createAt
  }
}
```

```graphql
mutation {
  updateNotification(
    id: "1ca7726e-0af8-4ff1-8ef1-4eae97377162"
    input: { status: Deleted }
  ) {
    id
    targetId
    userId
    content
    createAt
  }
}
```

## RESTful Endpoint Test

> Please remove `/dev` from path if test using local nestjs mode

```
curl -X POST 'http://localhost:3000/dev/notification' \
  -H 'Content-Type: application/json' \
  --data-raw '{ "targetId": "device1", "userId": "user1", "content": "Hello" }'
```

```
curl -X GET 'http://localhost:3000/dev/notification?targetId=device1'
```

```
curl -X GET 'http://localhost:3000/dev/notification?userId=user1'
```

```
curl -X PATCH 'http://localhost:3000/dev/notification/a30f7101-2434-4443-87fa-493c9d9d3358' \
  -H 'Content-Type: application/json' \
  --data-raw '{ "status": "Deleted" }'
```

