import { MoldRepository } from "../repository/mold/MoldRepository.js";
import { FindManyMoldsService } from "../service/molds/FindManyMoldsService.js";

export function makeFindMolds() {

    const moldRepository = new MoldRepository() 
    const findMoldsByIdService = new FindManyMoldsService(moldRepository)

    return findMoldsByIdService
}