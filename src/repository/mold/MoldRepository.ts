import { Prisma } from "@prisma/client";
import { CreateMoldDto, DeleteType, MoldInterface, PhotosType } from "../../interface/MoldInterface.js";
import { prisma } from "../../database/prisma.js";
import { string } from "zod";

export class MoldRepository implements MoldInterface {
    

    async create(mold: Prisma.MoldsUncheckedCreateInput, photo: PhotosType): Promise<CreateMoldDto> {
        const molds = await prisma.molds.create({
            data: {
                amount: mold.amount,
                tonality: mold.tonality,
                model: mold.model,
                price: mold.price,
                image: mold.image || null,
                userId: mold.userId,
                PhotosMolds: {
                    create: {
                        image: photo.image,
                        url: photo.url
                    }
                }
            },
            select: {
                amount: true,
                tonality: true,
                model: true,
                price: true,
                image: true,
                PhotosMolds: {
                    select: {
                        image: true,
                        url: true
                    }
                }
            }
        })

        return molds
    }

    async deleteById(id: number): Promise<DeleteType> {
      return await prisma.molds.delete({
        where: {
            id
        },
       select: {
        PhotosMolds: {
            select: {
                image: true
            }
        }
       }
       })

    }

    async findById(id: number): Promise<CreateMoldDto | null> {
        const molds = await prisma.molds.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                amount: true,
                tonality: true,
                model: true,
                price: true,
                image: true,
                PhotosMolds: {
                    select: {
                        image: true,
                        url: true
                    }
                }
            }
        })

        const moldNotFound = !molds

        if(moldNotFound) return null

        return molds
    }

    async findMany(): Promise<CreateMoldDto[]> {
        const mold = await prisma.molds.findMany({
            select: {
                id: true,
                amount: true,
                tonality: true,
                model: true,
                price: true,
                image: true,
                PhotosMolds: {
                    select: {
                        image: true,
                        url: true
                    }
                }
            }
        })

        return mold
    }
}