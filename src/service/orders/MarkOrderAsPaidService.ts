import { Orders } from "@prisma/client";
import { OrderRepository } from "../../repository/order/OrderRepository.js";
import { ResourceNotFoundError } from "../../error/ResourceNotFoundError.js";

interface MarkOrderAsPaidRequest {
    userId: string
    id: string
    clientName: string
}

interface MarkOrderAsPaidResponse {
    order: Orders
}

export class MarkOrderAsPaidService {
    constructor(
        private orderRepository: OrderRepository
    ){}

    async execute({ clientName, id, userId}: MarkOrderAsPaidRequest): Promise<MarkOrderAsPaidResponse> {
        const order = await this.orderRepository.updateByWasPaid(
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