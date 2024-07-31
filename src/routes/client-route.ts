import { Router } from 'express'
import { CreateClientController } from '../controller/client/CreateClientController.js'
import { jwtVerify } from '../middleware/jwt-verify.js'


const router = Router()

const createClientController = new CreateClientController()

router
    .post('/api/clients', jwtVerify , async (req, res) => createClientController.create(req, res))


export const clientRoute = router