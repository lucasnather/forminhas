import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeFindMolds } from "../../factory/make-find-mold-by-id.js";


export class FindManyMoldController {

    async findMany(req: Request, res: Response) {
        
        try {
    
            const findManyMoldsService = makeFindMolds()
            
            const { molds } = await findManyMoldsService.exeute()

            return res.status(201).json(molds)
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