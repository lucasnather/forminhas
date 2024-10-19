import { InMemoryUserRepository } from "../../repository/user/InMemoryUserRepository.js";
import { Hash } from "../../utils/Hash.js";
import { CreateUserService } from "./CreateUserService.js";

let inMemoryUserRepository: InMemoryUserRepository
let hash: Hash
let sut: CreateUserService
import { afterEach, beforeEach, describe, it, expect } from 'vitest'


beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    hash = new Hash()
    sut = new CreateUserService(inMemoryUserRepository, hash)
})

describe('Create User Service - test unit', () => {

    it('Should be able to create a new User', async () => {
        // const { user } = await sut.execute({
        //     username: 'lucasnather',
        //     email: 'nather@email.com',
        //     password: '12345678',
        //     role: 'Boss',
        // })

        // expect(user.id).toBeTruthy()
        // expect(user.createdAt).toBeTruthy()
    })

    it('Should not be able to create a user with duplicate username', async () => {
        await sut.execute({
            username: 'lucasnather',
            email: 'nather@email.com',
            password: '12345678',
            role: 'Boss',
        })

       expect(async () => {
        await sut.execute({
            username: 'lucasnather',
            email: 'nather@email.com',
            password: '12345678',
            role: 'Boss',
        })
       }).rejects.toBeInstanceOf(Error)
    })
})