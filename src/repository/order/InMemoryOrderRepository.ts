import { Prisma, Orders } from "@prisma/client";
import { OrderInterface } from "../../interface/OrderInterface.js";
import { randomUUID } from 'node:crypto'

export class InMemoryOrderRepository implements OrderInterface {
    updateByWasFinished(userId: string, id: string, clientName: string): Promise<Orders | null> {
        throw new Error("Method not implemented.");
    }
    updateByWasPaid(userId: string, id: string, clientName: string): Promise<Orders | null> {
        throw new Error("Method not implemented.");
    }
    

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