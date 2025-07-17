import express from 'express'
import materiaisRoutes from './routes/materiaisRoutes.js'
import clientesRouter from './routes/clientesRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3000

app.use('/materiais', materiaisRoutes)
app.use('/clientes', clientesRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} acesse em localhost:3000`)
})