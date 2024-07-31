import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler( err: unknown, req: Request, res: Response, next: NextFunction) {

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