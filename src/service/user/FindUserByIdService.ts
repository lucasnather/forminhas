import { FindUserDto, UserInterface } from "../../interface/UserInterface.js";
import { ResourceNotFoundError } from "../../error/ResourceNotFoundError.js";

type FindUserByIdRequest = {
    id: string
}

type FindUserByIdResponse = {
    user: FindUserDto
}

export class FindUserByIdService {

    constructor(
        private userInterface: UserInterface,
    ) {}

    async execute({ id }: FindUserByIdRequest): Promise<FindUserByIdResponse> {
        const isUserExist= await this.userInterface.findById(id)

        if(!isUserExist) throw new ResourceNotFoundError()
        
        return {
            user: isUserExist
        }
    }
}