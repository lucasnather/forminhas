import { MoldRepository } from "../repository/mold/MoldRepository.js";
import { FindMoldsByIdService } from "../service/molds/FindMoldsByIdService.js";

export function makeFindMoldById() {

    const moldRepository = new MoldRepository() 
    const findMoldsByIdService = new FindMoldsByIdService(moldRepository)

    return findMoldsByIdService
}