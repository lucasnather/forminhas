import { Router } from 'express'
import { CreateMoldController } from '../controller/molds/CreateMoldController.js'
import { jwtVerify } from '../middleware/jwt-verify.js'

const router = Router()

const createMoldController = new CreateMoldController()

router
    .post('/api/molds', jwtVerify, async (req, res) => createMoldController.create(req, res))


export const moldRoute = router