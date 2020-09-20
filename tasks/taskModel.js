const db = require('../database/dbconfig')

module.exports = {
    find,
    findById,
    findByUserId,
    create,
    remove,
    edit,
}

function find() {
    return db('tasks')
        .orderBy('tasks.id', 'desc')

}

function findById(id) {
    return db('tasks')
        .where({ id })
        .first()
}

function findByUserId(userId) {
    return db('tasks')
        .where({ user_id: userId })
}

function create(task) {
    return db('tasks')
        .insert(task)
}

function remove() {
    return db('tasks')
}

function edit() {
    return db('tasks')
}