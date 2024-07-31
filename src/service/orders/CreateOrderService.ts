import { Orders } from "@prisma/client";
import { ClientInterface } from "../../interface/ClientInterface.js";
import { OrderInterface } from "../../interface/OrderInterface.js";

type CreateOrderRequest = {
    moldsId: number[]
    clientId: string
    userId: string
}

type CreateOrderResponse = {
    order: Orders
}

export class CreateOrderService {

    constructor(
        private orderInterface: OrderInterface,
        private clientInterface: ClientInterface
    ) {}

    async execute({ clientId, moldsId, userId }: CreateOrderRequest): Promise<CreateOrderResponse> {
        const client = await this.clientInterface.findById(clientId)

        if(!client) throw new Error('Client Not Found')

        const order = await this.orderInterface.create({
            clientId,
            userId
        }, moldsId)

        return {
            order
        }

    }
}