import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeFindUserById } from "../../factory/make-find-user-by-id.js";


export class FindUserByIdController {

    async findById(req: Request, res: Response) {
        
        try {
            const sub = req.cookies
    
            const findUserByIdService = makeFindUserById()
            
            const { user } = await findUserByIdService.execute({
                id: sub
            })

            return res.status(201).json({
                user
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