import { Molds, Prisma } from "@prisma/client";

export type CreateMoldDto = {
    amount: number
    tonality: string
    model: string
    price: number
    image?: string | null
}

export type PhotosProps = {
    id: number
    image: string
    url: string | null
}

export type PhotosMoldsProps = {
    image: string
}

export type DeleteType = {
    PhotosMolds: PhotosMoldsProps[]
}

export type PhotosType = Omit<PhotosProps, 'id'>

export interface MoldInterface {
    create(mold: Prisma.MoldsUncheckedCreateInput, photo: PhotosType): Promise<CreateMoldDto>
    deleteById(id: number): Promise<DeleteType>
    findById(id: number): Promise<CreateMoldDto | null>
    findMany(): Promise<CreateMoldDto[]>
}