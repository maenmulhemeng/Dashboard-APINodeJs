## Inroduction

This project is a nodejs API. It has `Jobs` end point and it provides the following functions:

1. GET all jobs
1. GET a single job
1. POST a job
1. PUT a job
1. Delete a job

We assume when we launch the application it'd have 2 jobs in the array of jobs

## Run

Please first intall the packages `npm run install` and then run the API `npm run start`

NOTE: it will run on PORT `3001`

## Test

To run the unit tests `npm run test`

## Packages

1. Express is installed
1. Middlewares:
   - cookie-parser: to parse the request body
   - cors to handle request from different origins
1. For Testing
   - Jest
   - supertest
   - cross-env
