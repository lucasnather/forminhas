import { ResourceNotFoundError } from "../../error/ResourceNotFoundError.js"
import { CreateMoldDto, MoldInterface } from "../../interface/MoldInterface.js"

type FindMoldsByIdRequest = {
    id: number
}

type FindMoldsByIdResponse = {
    mold: CreateMoldDto
}

export class FindMoldsByIdService {

    constructor(
        private moldsInterface: MoldInterface
    ) {}

    async exeute({ id }: FindMoldsByIdRequest): Promise<FindMoldsByIdResponse> {
        const mold = await this.moldsInterface.findById(id)

        if(!mold) throw new ResourceNotFoundError()

        return {
            mold
        }
    }
}