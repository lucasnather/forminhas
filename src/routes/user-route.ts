import { Router } from 'express'
import { CreateUserController } from '../controller/user/CreateUserController.js'
import { AuthenticateUserController } from '../controller/user/AuthenticateUserController.js'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

router
    .post('/api/register', async (req, res) => createUserController.create(req, res))
    .post('/api/authenticate', async (req, res) => authenticateUserController.authenticate(req, res))


export const userRoute = router