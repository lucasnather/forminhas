import { Server, createServer } from 'node:http'
import request from 'supertest'
import { app } from '../../server.js'

let server: Server

beforeEach(async () => {
    server = createServer(app)
    server.listen(3001)
})

afterEach(async () => {
    server.close()
})

describe('Create User - E2e', () => {
    
    it('Should be able to register a user', async () => {
        
        await request(server)
            .post('/api/register')
            .send({
                    username: "user",
                    email: "user@email.com",
                    password: "12345678"
                })
            .expect(201)
        
        
    })

    it('Should not be able to register a user', async () => {
        
        await request(server)
            .post('/api/register')
            .send({
                    username: "user",
                    email: "user@email.com",
                    password: "12345678"
                })
        
        await request(server)
            .post('/api/register')
            .send({
                username: "user",
                email: "user@email.com",
                password: "12345678"
            })
            .expect(400)
    })


})