import { Molds, Prisma } from "@prisma/client";

export type CreateMoldDto = {
    amount: number
    tonality: string
    model: string
    price: number
    image?: string | null
}

export interface MoldInterface {
    create(mold: Prisma.MoldsUncheckedCreateInput ): Promise<CreateMoldDto>
    deleteById(id: number): Promise<void>
    findById(id: number): Promise<CreateMoldDto | null>
    findMany(): Promise<CreateMoldDto[]>
}