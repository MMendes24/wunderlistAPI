const supertest = require("supertest")

const server = require("../api/server")

const db = require("../database/dbconfig")

describe('to know we can run any test we must test the tester', () => {
    it('can tell Zuko to drink some tea', () => {
        console.log('You should drink some tea, Zuko!')
    })
})

describe('taskRouter', () => {
    afterAll(async () => {
        await db('users').truncate();
    })
    describe('GET /api/tasks', () => {
        it('never lets us access data unless we login', () => {
            return supertest(server)
            .get('/api/tasks')
            .then(res => {
                expect(res.status).toBe(401)
            })
        })
    })
})