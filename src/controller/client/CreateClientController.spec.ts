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

describe('Create Client - E2e', () => {
    
    it('Should be able to register a client', async () => {

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
            .post('/api/clients')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: "user",
                lastName: "userlastname",
                contact: "(12) 44444-4444",
                address: "User address"
            })
            .expect(201)
        

    })
    it('Should not be able to register a client with invalid contact number', async () => {

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
            .post('/api/clients')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: "user",
                lastName: "userlastname",
                contact: "(XX) XXXXX-XXXX",
                address: "User address"
            })
            .expect(404)
        
    })

})