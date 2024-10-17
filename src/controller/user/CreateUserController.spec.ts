import { Server, createServer } from 'node:http'
import request from 'supertest'
import { app } from '../../index.js'
import { afterEach, beforeEach, describe, it } from 'vitest'


let server: Server

beforeEach(async () => {
    server = createServer(app)
    server.listen()
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