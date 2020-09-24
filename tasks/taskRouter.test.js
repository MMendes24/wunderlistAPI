const supertest = require("supertest")

const server = require("../api/server")

const db = require("../database/dbconfig")

let token = ""

describe('to know we can run any test we must test the tester', () => {
    it('can tell Zuko to drink some tea', () => {
        console.log('You should drink some tea, Zuko!')
    })
})

describe('taskRouter', () => {

    afterAll(async () => {
        await db('tasks').truncate();
    })

    describe('GET /api/tasks', () => {
        it('requires set up due to conflict with other tests', () => {
            return supertest(server)
                .post('/api/users/register')
                .send({
                    username: "user1",
                    password: "password",
                    email: "mars@mars.com",
                    name: "mars",
                    role: 1,
                    phone: "123-456-7890"
                })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
        it('requires set up due to conflict with other tests', () => {
            return supertest(server)
                .post('/api/users/login')
                .send({
                    username: "user1",
                    password: "password"
                })
                .then(res => {
                    token = res.body.token
                    supertest(server)
                        .get('/api/tasks')
                        .set({ Authorization: token })
                        .then(res => {
                            expect(res.status).toBe(200)
                        })
                })
        })
        it('never lets us access data unless we login', () => {
            return supertest(server)
                .get('/api/tasks')
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
        it('lets us access data because we can login', () => {
            return supertest(server)
                .get('/api/tasks')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        describe('POST /api/tasks', () => {
            it('should be able to create an item now', () => {
                return supertest(server)
                    .post('/api/tasks')
                    .set({ Authorization: token })
                    .send({
                        task: "make a test task",
                        user_id: 1,
                        completed: true,
                        date: "some day"
                    })
                    .then(res => {
                        expect(res.status).toBe(201)
                    })
            })
            it('should return that item as JSON', () => {
                return supertest(server)
                    .post('/api/tasks')
                    .set({ Authorization: token })
                    .send({
                        task: "make a test task",
                        user_id: 1,
                        completed: true,
                        date: "some day"
                    })
                    .then(res => {
                        expect(res.type).toMatch(/json/i)
                    })
            })
        })

        describe('GET /api/tasks/:id', () => {
            it('should deny us access to the club unless we have street cred', () => {
                return supertest(server)
                    .get('/api/tasks/1')
                    .then(res => {
                        expect(res.status).toBe(401)
                    })
            })
            it('lets us access a unqiue task because we can login', async () => {
                const reqTask = await db('tasks').first()

                return supertest(server)
                    .get(`/api/tasks/${reqTask.id}`)
                    .set({ Authorization: token })
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            })
        })

        describe('GET /api/tasks/user/:id', () => {
            it('should deny us access to the users tasks if lack cred', async () => {
                const userId = await db('tasks').first()

                return supertest(server)
                    .get(`/api/tasks/user/${userId.user_id}`)
                    .then(res => {
                        expect(res.status).toBe(401)
                    })
            })
            it('lets us access a unqiue users tasks because we can login', async () => {
                const userId = await db('tasks').first()

                return supertest(server)
                    .get(`/api/tasks/user/${userId.user_id}`)
                    .set({ Authorization: token })
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            })
        })

        describe('PUT /api/tasks', () => {
            it('should be able to edit an item now', () => {
                return supertest(server)
                    .put("/api/tasks/1")
                    .set({ Authorization: token })
                    .send({
                        task: "make a test task and then edit it!",
                        user_id: 1,
                        completed: true,
                        date: "some day"
                    })
                    .then(res => {
                        expect(res.status).toBe(204)
                    })
            })
            it('should fail if passed bad data', () => {
                return supertest(server)
                    .put("/api/tasks/1")
                    .set({ Authorization: token })
                    .send({
                        task: "bad task!",
                        completed: "how do computer?",
                        date: "some day"
                    })
                    .then(res => {
                        expect(res.status).toBe(400)
                    })
            })
        })
        describe('DELETE /api/tasks', () => {
            it('should be able to delete an item', () => {
                return supertest(server)
                    .delete("/api/tasks/1")
                    .set({ Authorization: token })
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            })
            it('cant delete an item it cannot find', () => {
                return supertest(server)
                    .delete("/api/tasks/101")
                    .set({ Authorization: token })
                    .then(res => {
                        expect(res.status).toBe(404)
                    })
            })
        })
    })
})