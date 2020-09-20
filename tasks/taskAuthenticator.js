const taskAuthenticator = (task) => {
    return task.task && task.user_id ? true : false
}
module.exports = taskAuthenticator