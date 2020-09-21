require("dotenv").config()

const knex = require("knex")

const knexfile = require("../knexfile.js")

const environment = process.env.NODE_ENV || "development"

//const environment = "development"

/*
There is an error when using jest for testing, it seems jest cannot read .env file.
when doing unit test, in order to get the right envrioment setting, we can switch to line 9 and comment out line 7. 
*/

module.exports = knex(knexfile[environment])
