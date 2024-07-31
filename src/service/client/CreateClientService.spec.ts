import { InMemoryClientRepository } from "../../repository/client/InMemoryClientRepository.js"
import { CreateClientService } from "./CreateClientService.js"


let inMemoryClientRepository: InMemoryClientRepository
let sut: CreateClientService

beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new CreateClientService(inMemoryClientRepository)
})

describe('Create Client Service - test unit', () => {

    it('Should be able to create a new Client', async () => {
        const { client } = await sut.execute({
            name: 'Bento',
            lastName: 'Pirata',
            address: 'Rua 2',
            contact: '(92) 98118-5780'
        })

        expect(client.id).toBeTruthy()
        expect(client.createdAt).toBeTruthy()
    })
})