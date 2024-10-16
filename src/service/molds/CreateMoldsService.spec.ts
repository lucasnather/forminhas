import { InMemoryMoldRepository } from "../../repository/mold/InMemoryMoldRepository.js";
import { CreateMoldsService } from "./CreateMoldsService.js";

let inMemoryMoldRepository: InMemoryMoldRepository
let sut: CreateMoldsService
import { afterEach, beforeEach, describe, it } from 'vitest'


beforeEach(() => {
    inMemoryMoldRepository = new InMemoryMoldRepository()
    sut = new CreateMoldsService(inMemoryMoldRepository)
})

describe('Create Mold Service - test unit', () => {

    // it('Should be able to create a new Mold', async () => {
    //     const { molds } = await sut.execute({
    //         amount: 200,
    //         model: 'Girassol',
    //         price: 1000,
    //         tonality: 'verde',
    //         userId: ''
    //     })

    //     expect(molds.id).toBeTruthy()
    //     expect(molds.createdAt).toBeTruthy()
    // })
})