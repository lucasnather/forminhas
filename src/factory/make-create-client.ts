import { ClientRepository } from "../repository/client/ClientRepository.js"
import { CreateClientService } from "../service/client/CreateClientService.js"

export function makeCreateClient() {
    const clientRepository = new ClientRepository()
    const createClientService = new CreateClientService(clientRepository)

    return createClientService
}