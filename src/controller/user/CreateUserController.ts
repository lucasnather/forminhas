import { z, ZodError } from "zod";
import { Request, Response } from "express";
import { makeCreateUser } from "../../factory/make-create-user.js";

const createUserBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Senha deve conter ao menos 8 caracteres"),
    role: z.enum(['Admin', 'Boss']).optional().default('Boss'),
})

export class CreateUserController {

    async create(req: Request, res: Response) {
        
        try {
            const { email,password,role,username  } = createUserBodySchema.parse(req.body)
    
            const createUserService = makeCreateUser()
            
            const { user } = await createUserService.execute({
                email,
                password,
                username,
                role
            })

            return res.status(201).json(user)
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