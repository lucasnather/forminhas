import { Client} from "@prisma/client";
import { ClientInterface } from "../../interface/ClientInterface.js";

type CreateClientRequest = {
    name: string
    contact: string
    address: string
    lastName:string
    userId: string
} 

type CreateClientResponse = {
    client: Client
}

export class CreateClientService {

    constructor(
        private clientInterface: ClientInterface,
    ) {}

    async execute({ address,contact,name, lastName, userId}: CreateClientRequest): Promise<CreateClientResponse> {

        const client = await this.clientInterface.create({
           address,
           contact,
           lastName,
           name,
           userId
        })

        return {
            client
        }
    }
}