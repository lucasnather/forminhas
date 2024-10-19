import { Prisma } from "@prisma/client";
import { CreateMoldDto, MoldInterface } from "../../interface/MoldInterface.js";
import { prisma } from "../../database/prisma.js";

export class MoldRepository implements MoldInterface {

    async create(mold: Prisma.MoldsUncheckedCreateInput): Promise<CreateMoldDto> {
        const molds = await prisma.molds.create({
            data: {
                amount: mold.amount,
                tonality: mold.tonality,
                model: mold.model,
                price: mold.price,
                image: mold.image || null,
                userId: mold.userId
            },
            select: {
                amount: true,
                tonality: true,
                model: true,
                price: true,
                image: true
            }
        })

        return molds
    }

    async findById(id: number): Promise<CreateMoldDto | null> {
        const molds = await prisma.molds.findUnique({
            where: {
                id
            },
            select: {
                amount: true,
                tonality: true,
                model: true,
                price: true,
                image: true
            }
        })

        const moldNotFound = !molds

        if(moldNotFound) return null

        return molds
    }

    async findMany(): Promise<CreateMoldDto[]> {
        const mold = await prisma.molds.findMany({
            select: {
                amount: true,
                tonality: true,
                model: true,
                price: true,
                image: true
            }
        })

        return mold
    }
}