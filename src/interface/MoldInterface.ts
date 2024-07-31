import { Molds, Prisma } from "@prisma/client";

export interface MoldInterface {
    create(mold: Prisma.MoldsUncheckedCreateInput ): Promise<Molds>
    findById(id: number): Promise<Molds | null>
}