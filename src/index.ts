import 'dotenv/config'
import express from 'express';
import session from 'express-session'
import { userRoute } from './routes/user-route.js'
import { env } from './env.js'
import { orderRoute } from './routes/order-route.js'
import { moldRoute } from './routes/mold-route.js'
import { clientRoute } from './routes/client-route.js'
import createMemoryStore from 'memorystore';


const MemoryStore = createMemoryStore(session)
export const app = express()

app.use(express.json())

app.use(session({
    name: '@canto-das-forminhas/session',
    secret: env.COOKIE_SECRET,
    store:  new MemoryStore({ checkPeriod: 86400000  }),
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 * 3, // 3 days,
        secure: true,
    },
    resave: false
}))

const port = env.PORT || 8080

app.get('/', async (req, res) => {
    res.json({
        message: "hello world"
    })
})

app.use(userRoute)
app.use(orderRoute)
app.use(moldRoute)
app.use(clientRoute)


app.listen(port, () => {
    console.log(`Server Running at port http://localhost:${port} `)
})