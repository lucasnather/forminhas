import { NotAutorizedError } from "../../error/NotAuthorized.js";
import { MoldInterface } from "../../interface/MoldInterface.js";
import { UserInterface } from "../../interface/UserInterface.js";

type DeleteMoldByIdRequest = {
    moldId: number
    userId: string
}

export class DeleteMoldByIdService {

    constructor(
        private moldInterface: MoldInterface,
        private userInterface: UserInterface
    ) {}

    async execute({ moldId, userId }: DeleteMoldByIdRequest): Promise<void> {
        const checkIfIsAdmin = await this.userInterface.findById(userId)

        if(checkIfIsAdmin?.role === 'User') throw new NotAutorizedError()

        await this.moldInterface.deleteById(moldId)
    }
}