import { Orders, Prisma } from "@prisma/client";

export interface OrderInterface {
    create(order: Prisma.OrdersUncheckedCreateInput,  moldsId: number[]): Promise<Orders>
    findMany(userId: string, page?: number, wasFinished?: boolean, wasPaid?: boolean): Promise<Orders[]>
    updateByWasFinished(userId: string, id: string, clientName: string): Promise<Orders | null>
    updateByWasPaid(userId: string, id: string, clientName: string): Promise<Orders | null>
}