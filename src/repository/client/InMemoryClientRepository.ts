import { Prisma, Client } from "@prisma/client";
import { ClientInterface } from "../../interface/ClientInterface.js";
import { randomUUID } from 'node:crypto'

export class InMemoryClientRepository implements ClientInterface {

    private clientItems: Client[] = []

    async create(client: Prisma.ClientUncheckedCreateInput): Promise<Client> {
        const clients: Client = {
            id: client.id ?? randomUUID(),
            name: client.name,
            contact: client.contact,
            address: client.address,
            lastName: client.lastName,
            userId: client.userId,
            createdAt: new Date(),
            updatedAt: null
        } 

        this.clientItems.push(clients)

        return clients
    }

    async findById(clientId: string): Promise<Client | null> {
        const clients = this.clientItems.find(client => client.id === clientId)

        const clientNotFound = !clients

        if(clientNotFound) return null

        return clients
    }

}