import { Router } from 'express'
import { CreateUserController } from '../controller/user/CreateUserController.js'
import { AuthenticateUserController } from '../controller/user/AuthenticateUserController.js'
import { FindUserByIdController } from '../controller/user/FindUserByIdController.js'
import { jwtVerify } from '../middleware/jwt-verify.js'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const findUserByIdController = new FindUserByIdController()

router
   /**
     * @swagger
     * /api/register:
     *   post:
     *     summary: Usuários
     *     tags: [Usuário]
     *     description: Cadastro de usuários por email, senha, username e role
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: user@email.com
     *               username:
     *                 type: string
     *                 example: lucasnather
     *               password:
     *                 type: string
     *                 example: 12345678
     *               role:
     *                 type: string
     *                 example: Boss
     *     responses: 
     *       201:
     *         description: Usuário Criado
     *         content:
     *           application/json:
     *             schema: 
     *               type: object
     *               properties: 
     *                 email:
     *                   type: string
     *                   description: user@email.com
     *                 username:
     *                   type: string
     *                   description: lucasnather
     *                 role:
     *                   type: string
     *                   description: Boss
     *       404:
     *         description: Não encontrado
 */

    .post('/api/register', async (req, res) => createUserController.create(req, res))
     /**
         * @swagger
         * /api/authenticate:
         *   post:
         *     summary: Usuários
         *     tags: [Usuário]
         *     description: Cadastro de usuários por email e senha
         *     produces:
         *       - application/json
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 example: user@email.com
         *               password:
         *                 type: string
         *                 example: 12345678
         *     responses: 
         *       201:
         *         description: Usuário Autenticado
         *         content:
         *           application/json:
         *             schema: 
         *               type: object
         *               properties: 
         *                 token:
         *                   type: string
         *       404:
         *         description: Não encontrado
     */
    .post('/api/authenticate', async (req, res) => authenticateUserController.authenticate(req, res))
    /**
         * @swagger
         * /api/user:
         *   get:
         *     summary: Usuários
         *     tags: [Usuário]
         *     description: Resgatar um usuário que está logado
         *     produces:
         *       - application/json
         *     responses: 
         *       201:
         *         description: Usuário Encontrado
         *         content:
            *           application/json:
            *             schema: 
            *               type: object
            *               properties: 
            *                 id:
            *                   type: string
            *                   description: uuid-do-usuario
            *                 email:
            *                   type: string
            *                   description: user@email.com
            *                 username:
            *                   type: string
            *                   description: lucasnather
            *                 role:
            *                   type: string
            *                   description: Boss
         *       404:
         *         description: Não encontrado
     */
    .get('/api/user', jwtVerify  , async (req, res) => findUserByIdController.findById(req, res))


export const userRoute = router

// *  security:
// *       - bearerAuth: []
//      *     responses: 
//      *       201:
//      *         description: Usuário Encontrado
//      *         content:
//         *           application/json:
//         *             schema: 
//         *               type: object
//         *               properties: 
//         *                 id:
//         *                   type: string
//         *                   description: uuid-do-usuario
//         *                 email:
//         *                   type: string
//         *                   description: user@email.com
//         *                 username:
//         *                   type: string
//         *                   description: lucasnather
//         *                 role:
//         *                   type: string
//         *                   description: Boss
//      *       404:
//      *         description: Não encontrado