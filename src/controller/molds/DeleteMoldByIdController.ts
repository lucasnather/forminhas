import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeFindMoldById } from "../../factory/make-find-many-molds.js";
import { makeDeleteMoldById } from "../../factory/make-delete-mold-by-id.js";

const deleteMoldParamSchema = z.object({
    moldId: z.coerce.number()
})

export class DeleteMoldByIdController {

    async remove(req: Request, res: Response) {
        
        try {
            const { moldId } = deleteMoldParamSchema.parse(req.params)
            const sub = req.cookies
    
            const deleteMoldByIdService = makeDeleteMoldById()
            
            await deleteMoldByIdService.execute({
                moldId,
                userId: sub
            })

            return res.status(201).json({
                message: 'Mold Deleted'
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