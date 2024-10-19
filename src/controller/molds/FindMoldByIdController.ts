import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeFindMoldById } from "../../factory/make-find-many-molds.js";

const findMoldParamSchema = z.object({
    id: z.coerce.number()
})

export class FindMoldByIdController {

    async find(req: Request, res: Response) {
        
        try {
            const { id } = findMoldParamSchema.parse(req.params)
    
            const findMoldsByIdService = makeFindMoldById()
            
            const { mold } = await findMoldsByIdService.exeute({
                id
            })

            return res.status(201).json(mold)
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