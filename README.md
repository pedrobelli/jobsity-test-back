# JobsityTestBack

This project was generated with [NestJS](https://docs.nestjs.com/v8/) version 8.0.0.

## Dependencies

This are my local dependencies used to run this project:
 - Nodejs 20.12.1;
 - npm 10.5.0 (you can use other package managers if you prefer);
 - Nest CLI 8.2.8;
 - Postgres DB;

Before attempting to start the server:
 - run `npm install` to install the project dependencies;
 - create a `.env` file in the main directory following this example:
 ```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_DATABASE=jobsity-test
AUTH_TOKEN_EXPIRES_IN=24h
AUTH_SECRET_KEY=QSpms7JrIhwazFWHOg5rkwmYz4kMY5Ec
 ```
  - create a postgres database using the parameters of your `.env` file;
  - run `npm run migrate` to execute project migrations;

## Development server

Run `npm run start:dev` for a dev server. The api address wil be `http://localhost:3000/`.