import { Router } from 'express'
import { CreateOrderController } from '../controller/orders/CreateOrderController.js'
import { jwtVerify } from '../middleware/jwt-verify.js'
import { FindManyOrderController } from '../controller/orders/FindManyOrdersController.js'
import { MarkOrderAsFinishedController } from '../controller/orders/MarkOrderAsFinishedController.js'
import { MarkOrderAsPaidController } from '../controller/orders/MarkOrderAsPaidController.js'

const router = Router()

const createOrderController = new CreateOrderController()
const findManyOrdersController = new FindManyOrderController()
const markOrderAsFinishedController = new MarkOrderAsFinishedController()
const markOrderAsPaidController = new MarkOrderAsPaidController()

router
    .post('/api/orders/:clientId', jwtVerify , async (req, res) => createOrderController.create(req, res))
    .get('/api/orders', jwtVerify, async (req, res) => findManyOrdersController.findMany(req, res))
    .get('/api/orders/:orderId/finished/:clientName', jwtVerify, async (req, res) => markOrderAsFinishedController.mark(req, res))
    .get('/api/orders/:orderId/paid/:clientName', jwtVerify, async (req, res) => markOrderAsPaidController.mark(req, res))


export const orderRoute = router