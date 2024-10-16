import { Server, createServer } from 'node:http'
import request from 'supertest'
import { app } from '../../server.js'
import { afterEach, beforeEach, describe, it } from 'vitest'

let server: Server

beforeEach(async () => {
    server = createServer(app)
    server.listen()
})

afterEach(async () => {
    server.close()
})

describe('Create Mold - E2e', () => {
    
    it('Should be able to register a mold', async () => {

        await request(server)
        .post('/api/register')
        .send({
                username: "user",
                email: "user@email.com",
                password: "12345678"
            })
    
        
        const response = await request(server)
            .post('/api/authenticate')
            .send({
                    username: "user",
                    email: "user@email.com",
                    password: "12345678"
                })
          
        const { token } = response.body
        
        
        await request(server)
            .post('/api/molds')
            .set('authorization', `Bearer ${token}`)
            .send({
                amount: 200,
                tonality: "verde",
                model: "Girassol",
                price: 700
            })
            .expect(201)
        
    })

})