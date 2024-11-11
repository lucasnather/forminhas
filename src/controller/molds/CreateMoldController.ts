import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeCreateMold } from "../../factory/make-create-mold.js";

const createMoldBodySchema = z.object({
    amount: z.coerce.number(),
    tonality: z.string(),
    model: z.enum(["Rosa_aberta", "Rosa_fechada", "Liro", "Coracoes_apaixonados", "Girassol"]),
    price: z.coerce.number(),
    image: z.string().url().optional()
})

const photosFileSchema = z.object({
    mimetype: z.string()
})

export class CreateMoldController {

    async create(req: Request, res: Response) {
        
        try {
            const { amount, model,tonality, price, image } = createMoldBodySchema.parse(req.body)
            const { mimetype } = photosFileSchema.parse(req.file)
            const sub = req.cookies

            const buffer = req.file?.buffer

    
            const createMoldService = makeCreateMold()
            
            const { molds } = await createMoldService.execute({
                amount,
                model,
                tonality,
                price,
                image,
                userId: sub,
                buffer,
                mimetype
            })

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