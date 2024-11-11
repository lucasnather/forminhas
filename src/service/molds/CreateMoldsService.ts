import { Model } from "@prisma/client";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { NotAutorizedError } from "../../error/NotAuthorized.js";
import { CreateMoldDto, MoldInterface } from "../../interface/MoldInterface.js";
import { UploaderInterface } from "../../interface/UploaderInterface.js";
import { UserInterface } from "../../interface/UserInterface.js";

type CreateMoldsRequest = {
    amount: number
    tonality: string
    model: Model
    price: number
    image?: string | null
    userId: string,
    mimetype: string,
    buffer: Buffer | undefined
} 

type CreateMoldsResponse = {
    molds: CreateMoldDto
}

export class CreateMoldsService {

    constructor(
        private moldInterface: MoldInterface,
        private userInterface: UserInterface,
        private uploaderInterface: UploaderInterface
    ) {}

    async execute({ amount, model, tonality, price, userId , image,buffer, mimetype}: CreateMoldsRequest): Promise<CreateMoldsResponse> {
        const checkIfIsAdmin = await this.userInterface.findById(userId)

        if(checkIfIsAdmin?.role === 'User') throw  new NotAutorizedError()

        const imageName = this.generateImageName()
        const bufferImage = buffer ? buffer : undefined
        const resizeImage = await this.resizeImage(bufferImage)
        const url = await this.uploaderInterface.findImages(imageName)

        const molds = await this.moldInterface.create({
            amount,
            model,
            tonality,
            price,
            image,
            userId,
        }, { image: imageName, url })

        await this.uploaderInterface.uploadImage({
            imageName,
            buffer: resizeImage,
            mimetype
        })

        return {
            molds
        }
    }

    private generateImageName() {
        return randomUUID()
    }

    private async resizeImage(buffer: Buffer | undefined) {
        return await sharp(buffer).resize({
            height: 200,
            width: 400,
            fit: 'contain'
        }).toBuffer()
    }
}