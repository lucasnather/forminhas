import { Model, Molds } from "@prisma/client";
import { CreateMoldDto, MoldInterface } from "../../interface/MoldInterface.js";

type CreateMoldsRequest = {
    amount: number
    tonality: string
    model: Model
    price: number
    image?: string | null
    userId: string
} 

type CreateMoldsResponse = {
    molds: CreateMoldDto
}

export class CreateMoldsService {

    constructor(
        private moldInterface: MoldInterface,
    ) {}

    async execute({ amount, model, tonality, price, userId , image}: CreateMoldsRequest): Promise<CreateMoldsResponse> {

        const molds = await this.moldInterface.create({
            amount,
            model,
            tonality,
            price,
            image,
            userId
        })

        return {
            molds
        }
    }
}