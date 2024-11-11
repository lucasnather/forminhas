import { MoldRepository } from "../repository/mold/MoldRepository.js"
import { UserRepository } from "../repository/user/UserRepository.js"
import { CreateMoldsService } from "../service/molds/CreateMoldsService.js"
import { CloudflareR2Repository } from "../storage/cloudflarer2-repository.js"

export function makeCreateMold() {
    const moldRepository = new MoldRepository()
    const userRepository = new UserRepository()
    const cloudflareR2Repository = new CloudflareR2Repository()
    const createMoldService = new CreateMoldsService(moldRepository, userRepository, cloudflareR2Repository)
    
    return createMoldService
}