import { NotAutorizedError } from "../../error/NotAuthorized.js";
import { MoldInterface } from "../../interface/MoldInterface.js";
import { UploaderInterface } from "../../interface/UploaderInterface.js";
import { UserInterface } from "../../interface/UserInterface.js";

type DeleteMoldByIdRequest = {
    moldId: number
    userId: string
}

export class DeleteMoldByIdService {

    constructor(
        private moldInterface: MoldInterface,
        private userInterface: UserInterface,
        private uploaderInterface: UploaderInterface
    ) {}

    async execute({ moldId, userId }: DeleteMoldByIdRequest): Promise<void> {
        const checkIfIsAdmin = await this.userInterface.findById(userId)

        if(checkIfIsAdmin?.role === 'User') throw new NotAutorizedError()

        const mold = await this.moldInterface.deleteById(moldId)
        console.log(mold)

        const image = mold.PhotosMolds[0].image ?? ""
        console.log(image)

        await this.uploaderInterface.deleteImages(image)
    }
}