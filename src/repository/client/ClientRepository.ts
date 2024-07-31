import { Prisma, Client } from "@prisma/client";
import { ClientInterface } from "../../interface/ClientInterface.js";
import { prisma } from "../../database/prisma.js";

export class ClientRepository implements ClientInterface {

    async create(client: Prisma.ClientUncheckedCreateInput): Promise<Client> {
        const clients = await prisma.client.create({
            data: {
                name: client.name,
                contact: client.contact,
                address: client.address,
                lastName: client.lastName,
                userId: client.userId
            }
        })

        return clients
    }

    async findById(clientId: string): Promise<Client | null> {
        const clients = await prisma.client.findUnique({
            where: {
                id: clientId
            }
        })

        const clientNotFound = !clients

        if(clientNotFound) return null

        return clients
    }

}