require("dotenv").config()

const knex = require("knex")

const knexfile = require("../knexfile.js")

const environment = process.env.NODE_ENV || "development"

/*
To run tests in development here is what you do:
make sure line 7 is commented it out and you uncomment the environment variable (now line 18), then do:
npx knex migrate:latest --env testing
npx knex seed:run --env testing
npm test
tests now run on test database
*/

// const environment = "testing"

/*
There is an error when using jest for testing, it seems jest cannot read .env file.
when doing unit test, in order to get the right envrioment setting, we can switch to line 9 and comment out line 7. 
*/

module.exports = knex(knexfile[environment])
