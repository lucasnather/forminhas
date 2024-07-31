import { Prisma, Orders } from "@prisma/client";
import { OrderInterface } from "../../interface/OrderInterface.js";
import { randomUUID } from 'node:crypto'

export class InMemoryOrderRepository implements OrderInterface {
    

    private ordersItems: Orders[] = []

    async create(order: Prisma.OrdersUncheckedCreateInput, moldsId: number[]): Promise<Orders> {

        const orders: Orders = {
            id: order.id ?? randomUUID(),
            clientId: order.clientId,
            userId: order.userId,
            createdAt: new Date(),
            updatedAt: null,
            wasFinished: false,
            wasPaid: false,
            finishedAt: null,
            
        } 

        this.ordersItems.push(orders)

        return orders
    }

    async findMany(): Promise<Orders[]> {
        return this.ordersItems
    }

}