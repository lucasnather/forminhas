import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeCreateClient } from "../../factory/make-create-client.js";

const createClientBodySchema = z.object({
    name: z.string(),
    contact: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato de número inválido - (XX) XXXXX-XXXX"),
    address: z.string(),
    lastName: z.string(),
})

export class CreateClientController {

    async create(req: Request, res: Response) {
        
        try {
            const { address, contact, lastName, name } = createClientBodySchema.parse(req.body)
            const sub = req.cookies
    
            const createClientService = makeCreateClient()
            
            const { client  } = await createClientService.execute({
                address,
                contact,
                lastName,
                name,
                userId: sub
            })

            return res.status(201).json(client)
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