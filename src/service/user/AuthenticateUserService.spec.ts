// import { hash } from "bcrypt";
// import { InMemoryUserRepository } from "../../repository/user/InMemoryUserRepository.js";
// import { Hash } from "../../utils/Hash.js";
// import { AuthenticateUserService } from "./AuthenticateUserService.js";
// import { afterEach, beforeEach, describe, it , expect} from 'vitest'


// let inMemoryUserRepository: InMemoryUserRepository
// let hashPassowrd: Hash
// let sut: AuthenticateUserService

// beforeEach(() => {
//     inMemoryUserRepository = new InMemoryUserRepository()
//     hashPassowrd = new Hash()
//     sut = new AuthenticateUserService(inMemoryUserRepository, hashPassowrd)
// })

// describe('Create Authenticate Service - test unit', () => {

//     it('Should be able to authenticate a user', async () => {
//         inMemoryUserRepository.create({
//             username: 'lucasnather',
//             email: 'nather@email.com',
//             password: await hash('12345678', 8),
//         })

//         const { user } = await sut.execute({
//             email: 'nather@email.com',
//             password: '12345678',
//         })

//         expect(user.id).toBeTruthy()
//         expect(user.createdAt).toBeTruthy()
//     })

//     it('Should not be able to authenticate a user with invalid credendials', async () => {
//         inMemoryUserRepository.create({
//             username: 'lucasnather',
//             email: 'nather@email.com',
//             password: '12345678',
//         })
       
//        expect(async () => {
//         await sut.execute({
//             email: 'nather@email.com',
//             password: 'wrong-password',
//         })
//        }).rejects.toBeInstanceOf(Error)
//     })
// })