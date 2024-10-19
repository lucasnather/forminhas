import { ResourceNotFoundError } from "../../error/ResourceNotFoundError.js"
import { CreateMoldDto, MoldInterface } from "../../interface/MoldInterface.js"


type FindManyMoldsByIdResponse = {
    molds: CreateMoldDto[]
}

export class FindManyMoldsService {

    constructor(
        private moldsInterface: MoldInterface
    ) {}

    async exeute(): Promise<FindManyMoldsByIdResponse> {
        const molds = await this.moldsInterface.findMany()

        if(!molds) throw new ResourceNotFoundError()

        return {
            molds
        }
    }
}