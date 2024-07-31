import { z, ZodError } from "zod"
import { Request, Response } from "express";
import { makeOrderFinished } from "../../factory/make-order-finished.js";

const markOrderFinishedParamSchema = z.object({
    orderId: z.string().uuid(),
    clientName: z.string()
})


export class MarkOrderAsFinishedController {
    async mark(req:Request, res: Response) {
        
        try {
            const { orderId, clientName } = markOrderFinishedParamSchema.parse(req.params)
            const sub = req.cookies
    
            const markOrderAsFinished = makeOrderFinished()
            
            await markOrderAsFinished.execute({
                clientName,
                id: orderId,
                userId: sub
            })

            return res.status(201).json({
                message: 'Updated as finished'
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