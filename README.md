# library-management-system-api
<p align="center">A Library Management System API developed using <a href="https://nestjs.com/" target="_blank">Nest.js</a> framework and <a href="https://nestjs.com/" target="_blank">Typescript</a> programming language over <a href="https://www.typescriptlang.org/" target="_blank">Node.js</a> platform.</p>

## Features
* API for CRUD of a books (managing title, author, isbn, description)
* API for CRUD of a customer (managing name, email, phone)
* API to check in and check out a book
* API to track state changes for a book

## Documentation
* Featured by Open API specification (Swagger) you can see the documentation accessing /docs endpoint.

## Next Steps
- Features
  - Download book report
  - Allow renew due date to return a book
- Architecture
  - Error handler (using interceptor annotation)
  - Define table attributes limits (data size)
  - Health-check endpoint
- Failover
  - Handle fail database connection using a connection pool
- Security
  - Apply request body data validation to prevent inject
  - Change the primary key data type to UUID preventing dumb attacks

## Installation

```bash
$ npm install
```

## Running the app

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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE).
