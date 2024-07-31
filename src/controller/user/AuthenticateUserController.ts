import { z, ZodError } from "zod";
import { env } from "../../env.js";
import { Request, Response } from "express";
import { makeAuthenticateUser } from "../../factory/make-authenticate-user.js";
import jwt from 'jsonwebtoken'

const authenticateUserBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export class AuthenticateUserController {

    async authenticate(req: Request, res: Response) {
        let token
        
        try {
            const { email,password,username  } = authenticateUserBodySchema.parse(req.body)
    
            const authenticateUserService = makeAuthenticateUser()
            
            const { user } = await authenticateUserService.execute({
                email,
                password,
                username,
            })

            
            if(!req.cookies) {
                token = jwt.sign({
                    sub: user.id,
                    role: user.role,
                    
                }, env.JWT_SECRET , {
                    expiresIn: '3h'
                } )
            } else {
                req.cookies = token
            }

            return res.status(201).json({
                token
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