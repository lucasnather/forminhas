import { Model, Molds, Role, User } from "@prisma/client";
import { MoldInterface } from "../../interface/MoldInterface.js";

type CreateMoldsRequest = {
    amount: number
    tonality: string
    model: Model
    price: number
    userId: string
} 

type CreateMoldsResponse = {
    molds: Molds
}

export class CreateMoldsService {

    constructor(
        private moldInterface: MoldInterface,
    ) {}

    async execute({ amount, model, tonality, price, userId}: CreateMoldsRequest): Promise<CreateMoldsResponse> {

        const molds = await this.moldInterface.create({
            amount,
            model,
            tonality,
            price,
            userId
        })

        return {
            molds
        }
    }
}