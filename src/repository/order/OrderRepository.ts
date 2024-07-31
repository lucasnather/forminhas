import { Prisma, Orders } from "@prisma/client";
import { OrderInterface } from "../../interface/OrderInterface.js";
import { prisma } from "../../database/prisma.js";

export class OrderRepository implements OrderInterface {
 

    async create(order: Prisma.OrdersUncheckedCreateInput, moldsId: number[]): Promise<Orders> {

        const orders = await prisma.orders.create({
            data: {
                clientId: order.clientId,
                userId: order.userId,
                molds: {
                    connect: moldsId.map(moldId => {
                        return {
                            id: moldId
                        }
                    })
                },
            },
            include: {
                client: {
                    select: {
                        name: true,
                        lastName: true,
                        address: true,
                        contact: true
                    }
                },
                molds: {
                    select: {
                        tonality: true,
                        price: true,
                        model: true,
                        amount: true,
                    }
                }
            },
            
        })

        return orders
    }

    async findMany(userId: string, page?: number, wasFinished?: boolean, wasPaid?: boolean): Promise<Orders[]> {
        const orders = await prisma.orders.findMany({
            where: {
                AND: [
                    {
                        wasFinished
                    },
                    {
                        wasPaid
                    },
                    {
                        userId
                    }
                ]
            },
            include: {
                client: {
                    select: {
                        name: true,
                        lastName: true,
                        address: true,
                        contact: true
                    }
                },
                molds: {
                    select: {
                        tonality: true,
                        price: true,
                        model: true,
                        amount: true,
                    }
                }
            },
            take: 10,
            skip: !page ? 0 : (page - 1 ) * 10
        })


        return orders
    }

    async updateByWasFinished(userId: string, id: string, clientName: string): Promise<Orders | null> {
       const orders = await prisma.orders.update({
            where: {
                id,
                userId,
                wasFinished: false,
                client: {
                    name: clientName
                }
            },
            data: {
                wasFinished: true
            }
       })

       if(!orders) return null

       return orders
    }

    async updateByWasPaid(userId: string, id: string, clientName: string): Promise<Orders | null> {
        const orders = await prisma.orders.update({
            where: {
                id,
                userId,
                wasPaid: false,
                client: {
                    name: clientName
                }
            },
            data: {
                wasPaid: true
            }
       })

       if(!orders) return null

       return orders
    }


}