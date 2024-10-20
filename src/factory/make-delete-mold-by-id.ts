import { MoldRepository } from "../repository/mold/MoldRepository.js";
import { UserRepository } from "../repository/user/UserRepository.js";
import { DeleteMoldByIdService } from "../service/molds/DeleteMoldByIdService.js";

export function makeDeleteMoldById() {
    const moldRepository = new MoldRepository()
    const userRepository = new UserRepository()
    const deleteMoldByIdService = new DeleteMoldByIdService(moldRepository, userRepository)

    return deleteMoldByIdService
}