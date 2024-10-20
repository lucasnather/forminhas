import { Prisma, Molds } from "@prisma/client";
import { CreateMoldDto, MoldInterface } from "../../interface/MoldInterface.js";

export class InMemoryMoldRepository implements MoldInterface {
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findMany(): Promise<CreateMoldDto[]> {
        throw new Error("Method not implemented.");
    }

    private moldsItems: Molds[] = []
    private id: number = 0
   

    async create(mold: Prisma.MoldsUncheckedCreateInput): Promise<Molds> {
        const molds: Molds = {
            id: mold.id ?? this.generateAutoincrementId(),
            amount: mold.amount,
            tonality: mold.tonality,
            model: mold.model,
            price: mold.price,
            userId: mold.userId,
            image: mold.image || null,
            createdAt: new Date(),
            updatedAt: null
        }

        this.moldsItems.push(molds)

        return molds
    }

    async findById(id: number): Promise<Molds | null> {
        const molds = this.moldsItems.find(mold => mold.id === id)

        const moldNotFound = !molds

        if(moldNotFound) return null

        return molds
    }

    private generateAutoincrementId() {
        return ++this.id
    }
}