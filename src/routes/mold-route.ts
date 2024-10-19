import { Router } from 'express'
import { CreateMoldController } from '../controller/molds/CreateMoldController.js'
import { FindManyMoldController } from '../controller/molds/FindManyMoldsController.js'
import { FindMoldByIdController } from '../controller/molds/FindMoldByIdController.js'
import { FindManyOrderController } from '../controller/orders/FindManyOrdersController.js'
import { jwtVerify } from '../middleware/jwt-verify.js'

const router = Router()

const createMoldController = new CreateMoldController()
const findManyOrdersByIdController = new FindMoldByIdController()
const findManyMoldController = new FindManyMoldController()

router
    /**
 * @swagger
 * /api/molds:
 *   post:
 *     summary: Forminhas
 *     tags: [Forminhas]
 *     description: Cadastro de forminhas por amount, model, tonality, price
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 200
 *               model:
 *                 type: string
 *                 example: Liro
 *               tonality:
 *                 type: string
 *                 example: verde
 *               price:
 *                 type: number
 *                 example: 10
 *               image:
 *                 type: string
 *                 example: http://image.com.br
 *     responses: 
 *       201:
 *         description: Forminha Criada
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties: 
 *                 amount:
 *                   type: number
 *                 model:
 *                   type: string
 *                 tonality:
 *                   type: string
 *                 image:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Não encontrado
 */
    .post('/api/molds', jwtVerify, async (req, res) => createMoldController.create(req, res))
       /**
     * @swagger
     * /api/molds/{id}:
     *   get:
     *     summary: Forminhas
     *     tags: [Forminhas]
     *     description: Encontrar Forminha Por ID
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer 
     *     responses: 
     *       201:
     *         description: Forminha Criada
     *         content:
     *           application/json:
     *             schema: 
     *               type: object
     *               properties: 
     *                 amount:
     *                   type: number
     *                 model:
     *                   type: string
     *                 tonality:
     *                   type: string
     *                 image:
     *                   type: string
     *                 price:
     *                   type: number
     *       404:
     *         description: Não encontrado
     */
    .get('/api/molds/:id', async (req, res) => findManyOrdersByIdController.find(req, res))
       /**
     * @swagger
     * /api/molds:
     *   get:
     *     summary: Forminhas
     *     tags: [Forminhas]
     *     description: Encontrar Todas as Forminhas
     *     responses: 
     *       201:
     *         description: Forminha Criada
     *         content:
     *           application/json:
     *             schema: 
     *               type: object
     *               properties: 
     *                 amount:
     *                   type: number
     *                 model:
     *                   type: string
     *                 tonality:
     *                   type: string
     *                 image:
     *                   type: string
     *                 price:
     *                   type: number
     *       404:
     *         description: Não encontrado
     */
    .get('/api/molds', async (req, res) => findManyMoldController.findMany(req, res))

export const moldRoute = router