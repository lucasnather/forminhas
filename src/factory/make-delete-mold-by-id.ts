import { MoldRepository } from "../repository/mold/MoldRepository.js";
import { UserRepository } from "../repository/user/UserRepository.js";
import { DeleteMoldByIdService } from "../service/molds/DeleteMoldByIdService.js";
import { CloudflareR2Repository } from "../storage/cloudflarer2-repository.js";

export function makeDeleteMoldById() {
    const moldRepository = new MoldRepository()
    const userRepository = new UserRepository()
    const cloudflareR2Repository = new CloudflareR2Repository()
    const deleteMoldByIdService = new DeleteMoldByIdService(moldRepository, userRepository, cloudflareR2Repository)

    return deleteMoldByIdService
}