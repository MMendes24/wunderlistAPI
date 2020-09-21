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
        it('never lets us access data unless we login', () => {
            return supertest(server)
                .get('/api/tasks')
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
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
                            console.log(res.body)
                        })
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
        })
    })
})