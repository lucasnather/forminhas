import { Orders } from "@prisma/client";
import { OrderRepository } from "../../repository/order/OrderRepository.js";
import { ResourceNotFoundError } from "../../error/ResourceNotFoundError.js";

interface MarkOrderAsFinishedRequest {
    userId: string
    id: string
    clientName: string
}

interface MarkOrderAsFinishedResponse {
    order: Orders
}

export class MarkOrderAsFinishedService {
    constructor(
        private orderRepository: OrderRepository
    ){}

    async execute({ clientName, id, userId}: MarkOrderAsFinishedRequest): Promise<MarkOrderAsFinishedResponse> {
        const order = await this.orderRepository.updateByWasFinished(
            userId,
            id,
            clientName
        )

        if(!order) throw new ResourceNotFoundError('Order Not found')

        return {
            order
        }
    }
}