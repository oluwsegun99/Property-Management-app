# Homecrescent-Backend

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Starting the database
```bash
$ docker-compose up
$ npx prisma migrate deploy
$ npx prisma generate
```

## generating the GraphQL types
```bash
$ yarn gen:graphql
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
