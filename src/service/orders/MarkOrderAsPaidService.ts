import { Orders } from "@prisma/client";
import { OrderRepository } from "../../repository/order/OrderRepository.js";

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

        if(!order) throw new Error('Client with order Not found')

        return {
            order
        }
    }
}