import { Orders } from "@prisma/client";
import { OrderInterface } from "../../interface/OrderInterface.js";

type FindManyOrderRequest = {
    page?: number 
    wasFinished?: boolean 
    wasPaid?: boolean
    userId: string
}

type FindManyOrderResponse = {
    orders: Orders[]
}

export class FindManyOrderService {

    constructor(
        private orderInterface: OrderInterface,
    ) {}

    async execute({ userId, page, wasFinished, wasPaid }: FindManyOrderRequest): Promise<FindManyOrderResponse> {

        const orders = await this.orderInterface.findMany(userId, page, wasFinished, wasPaid)
      

        return {
            orders
        }

    }
}