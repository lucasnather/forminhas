import { z, ZodError } from "zod"
import { Request, Response } from "express";
import { makeOrderPaid } from "../../factory/make-order-paid.js";

const markOrderPaidParamSchema = z.object({
    orderId: z.string().uuid(),
    clientName: z.string()
})


export class MarkOrderAsPaidController {
    async mark(req:Request, res: Response) {
        
        try {
            const { orderId, clientName } = markOrderPaidParamSchema.parse(req.params)
            const sub = req.cookies
    
            const markOrderAsPaid = makeOrderPaid()
            
            await markOrderAsPaid.execute({
                clientName,
                id: orderId,
                userId: sub
            })

            return res.status(201).json({
                message: 'Updated as paid'
            })
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