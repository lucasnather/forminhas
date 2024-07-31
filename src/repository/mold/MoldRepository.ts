import { Prisma, Molds } from "@prisma/client";
import { MoldInterface } from "../../interface/MoldInterface.js";
import { prisma } from "../../database/prisma.js";

export class MoldRepository implements MoldInterface {
   

    async create(mold: Prisma.MoldsUncheckedCreateInput): Promise<Molds> {
        const molds = await prisma.molds.create({
            data: {
                amount: mold.amount,
                tonality: mold.tonality,
                model: mold.model,
                price: mold.price,
                userId: mold.userId
            }
        })

        return molds
    }

    async findById(id: number): Promise<Molds | null> {
        const molds = await prisma.molds.findUnique({
            where: {
                id
            }
        })

        const moldNotFound = !molds

        if(moldNotFound) return null

        return molds
    }
}