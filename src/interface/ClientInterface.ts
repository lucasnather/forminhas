import { Client, Prisma } from "@prisma/client";

export interface ClientInterface {
    create(client: Prisma.ClientUncheckedCreateInput): Promise<Client>
    findById(clientId: string): Promise<Client | null>
}