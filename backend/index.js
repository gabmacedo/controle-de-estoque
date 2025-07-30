import express from 'express'
import materiaisRoutes from './routes/materiaisRoutes.js'
import clientesRouter from './routes/clientesRoutes.js'
import userRouter from './routes/userRoutes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3000

app.use('/materiais', materiaisRoutes)
app.use('/clientes', clientesRouter)
app.use('/auth', userRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} acesse em localhost:3000`)
})