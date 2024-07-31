import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeFindManyOrder } from "../../factory/make-find-many-orders.js";

const findManyOrderQuerySchema = z.object({
    page: z.coerce.number().optional().default(0),
    wasFinished: z.coerce.boolean().optional(),
    wasPaid: z.coerce.boolean().optional()
})

export class FindManyOrderController {

    async findMany(req: Request, res: Response) {
        
        try {
            const { page, wasFinished, wasPaid } = findManyOrderQuerySchema.parse(req.query)
            const sub = req.cookies
            const findManyOrderService = makeFindManyOrder()
            
            const { orders } = await findManyOrderService.execute({
                userId: sub,
                page,
                wasFinished,
                wasPaid
            })

            return res.status(200).json(orders)
        } catch(err) {
            if(err instanceof ZodError) {
                res.status(404).json({
                    status: 404,
                    message: 'Validation Error',
                    error: err.flatten().fieldErrors
                })
                return
            }
        
            if(err instanceof Error) {
                res.status(401).json({
                    status: 401,
                    message: 'Bad Request',
                    error: err.message
                })
                return
            }
        
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }

    }
}