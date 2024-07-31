import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { env } from "../env.js";

export function jwtVerify(req: Request, res: Response, next: NextFunction) {
   const { authorization } = req.headers

    let token = authorization?.substring(7, authorization.length)
    
    if(!token) {
        res.status(404).json({
            message: "Não autorizado"
        })
        return
        
    }
    
    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if(err) {
            res.status(403).json({
                message: "Não autorizado"
            })
        }

        req.cookies = decoded?.sub

    })
    
    next()

    
}   