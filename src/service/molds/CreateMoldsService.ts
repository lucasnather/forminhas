import { Model, Molds, Role } from "@prisma/client";
import { NotAutorizedError } from "../../error/NotAuthorized.js";
import { CreateMoldDto, MoldInterface } from "../../interface/MoldInterface.js";
import { UserInterface } from "../../interface/UserInterface.js";

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
        private userInterface: UserInterface
    ) {}

    async execute({ amount, model, tonality, price, userId , image}: CreateMoldsRequest): Promise<CreateMoldsResponse> {
        const checkIfIsAdmin = await this.userInterface.findById(userId)

        if(checkIfIsAdmin?.role === 'User') throw  new NotAutorizedError()

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