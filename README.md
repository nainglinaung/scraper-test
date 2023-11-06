<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

This is the backend part of the app. To check out the frontend, please click here.

## Docker Compose

To start the Docker Compose setup in detached mode, use the following command:

```bash
$ docker compose up -d 
```

## Installation

To install the required dependencies, run the following command:

```bash
$ npm install
```

## Prisma Migration 

To execute Prisma migrations in development mode, use this command:

```bash
$ npx prisma migrate dev
```

## Running the app

You can run the application in different modes using these commands:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```
