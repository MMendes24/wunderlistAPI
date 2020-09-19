const db = require('../database/dbconfig')

module.exports = {
    find,
}

function find() {
    return db('tasks')
}