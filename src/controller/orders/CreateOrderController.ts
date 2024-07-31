import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeCreateOrder } from "../../factory/make-create-order.js";

const createOrderBodySchema = z.object({
    moldsId: z.array(z.number())
})

const createOrderParamSchema = z.object({
    clientId: z.string().uuid()
})

export class CreateOrderController {

    async create(req: Request, res: Response) {
        
        try {
            const { moldsId } = createOrderBodySchema.parse(req.body)
            const { clientId } = createOrderParamSchema.parse(req.params)
            const sub = req.cookies
    
            const createOrderService = makeCreateOrder()
            
            const { order } = await createOrderService.execute({
                clientId,
                moldsId,
                userId: sub
            })

            return res.status(201).json(order)
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
                res.status(400).json({
                    status: 400,
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