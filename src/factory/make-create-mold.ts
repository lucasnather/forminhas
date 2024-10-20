import { MoldRepository } from "../repository/mold/MoldRepository.js"
import { UserRepository } from "../repository/user/UserRepository.js"
import { CreateMoldsService } from "../service/molds/CreateMoldsService.js"

export function makeCreateMold() {
    const moldRepository = new MoldRepository()
    const userRepository = new UserRepository()
    const createMoldService = new CreateMoldsService(moldRepository, userRepository)
    
    return createMoldService
}