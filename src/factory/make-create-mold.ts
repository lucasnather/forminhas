import { MoldRepository } from "../repository/mold/MoldRepository.js"
import { CreateMoldsService } from "../service/molds/CreateMoldsService.js"

export function makeCreateMold() {
    const moldRepository = new MoldRepository()
    const createMoldService = new CreateMoldsService(moldRepository)
    
    return createMoldService
}