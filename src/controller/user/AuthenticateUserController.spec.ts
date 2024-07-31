import { Server, createServer } from 'node:http'
import request from 'supertest'
import { app } from '../../server.js'

let server: Server

beforeEach(async () => {
    server = createServer(app)
    server.listen()
})

afterEach(async () => {
    server.close()
})

describe('Authenticate User - E2e', () => {
    
    it('Should be able to authenticate a user', async () => {

        await request(server)
        .post('/api/register')
        .send({
                username: "user",
                email: "user@email.com",
                password: "12345678"
            })
    
        
        await request(server)
            .post('/api/authenticate')
            .send({
                    username: "user",
                    email: "user@email.com",
                    password: "12345678"
                })
            .expect(201)
        
        
    })

    it('Should not be able to authenticate a user with invalid credentials', async () => {
        
        await request(server)
            .post('/api/authenticate')
            .send({
                username: "wrong-username",
                email: "wrong-email@email.com",
                password: "12345678"
            })
            .expect(401)
    })


})